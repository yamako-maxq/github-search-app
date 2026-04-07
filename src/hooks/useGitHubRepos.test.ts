import { renderHook, act } from "@testing-library/react";
import { useGitHubRepos } from "./useGitHubRepos"; // ※実際のパスに合わせて変更してください
import { fetchGitHubRepos } from "@/utils/apis/fetchGitHubRepos";
import { validateGitHubRepos } from "@/utils/validations/gitHubRepos";

// --- 外部依存のモック化 ---
jest.mock("@/config/config", () => ({
    config: {
        api: {
            searchReposPerPage: 30,
            searchReposMaxResults: 1000,
        },
    },
}));

jest.mock("@/utils/apis/fetchGitHubRepos");
jest.mock("@/utils/validations/gitHubRepos");

const mockFetchGitHubRepos = fetchGitHubRepos as jest.Mock;
const mockValidateGitHubRepos = validateGitHubRepos as jest.Mock;

describe("useGitHubRepos", () => {
    // 各テストの前にモックの履歴をリセット
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("初期状態", () => {
        test("初期のステートが正しいか", () => {
            const { result } = renderHook(() => useGitHubRepos());

            expect(result.current.results).toEqual([]);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.totalPages).toBe(0);
        });
    });

    describe("searchRepos", () => {
        test("クエリが空文字の場合、何も実行せずに早期リターンすること", async () => {
            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("   ", 1);
            });

            expect(mockValidateGitHubRepos).not.toHaveBeenCalled();
            expect(mockFetchGitHubRepos).not.toHaveBeenCalled();
            expect(result.current.loading).toBe(false);
        });

        test("バリデーションに失敗した場合、エラーがセットされること", async () => {
            mockValidateGitHubRepos.mockReturnValue(false); // バリデーションNG
            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("invalid-query", 1);
            });

            expect(mockValidateGitHubRepos).toHaveBeenCalledWith("invalid-query", 1);
            expect(mockFetchGitHubRepos).not.toHaveBeenCalled();
            expect(result.current.error).toBe("リクエストされた値が正しくありません");
            expect(result.current.loading).toBe(false);
        });

        test("API呼び出しが成功し、データが存在する場合、結果と総ページ数が正しくセットされること", async () => {
            mockValidateGitHubRepos.mockReturnValue(true);

            const mockData = {
                total_count: 100, // 100件のヒット
                items: [{ id: 1, name: "repo1" }, { id: 2, name: "repo2" }],
            };

            mockFetchGitHubRepos.mockResolvedValue({
                status: 200,
                data: mockData,
            });

            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("react", 1);
            });

            // ステートが正しいか
            expect(mockFetchGitHubRepos).toHaveBeenCalledWith("react", 1, 30);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.results).toEqual(mockData.items);
            // Math.ceil(Math.min(100, 1000) / 30) = Math.ceil(100 / 30) = 4
            expect(result.current.totalPages).toBe(4);
        });

        test("API呼び出しが成功したが、リポジトリ一覧がnullの場合からの配列を返すこと", async () => {
            mockValidateGitHubRepos.mockReturnValue(true);

            const mockData = {
                total_count: 100, // 100件のヒット
                items: []
            };

            mockFetchGitHubRepos.mockResolvedValue({
                status: 200,
                data: mockData,
            });

            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("react", 1);
            });

            // ステートが正しいか
            expect(mockFetchGitHubRepos).toHaveBeenCalledWith("react", 1, 30);
            expect(result.current.loading).toBe(false);
            expect(result.current.error)
                .not
                .toBeNull();
            expect(result.current.results).toEqual(mockData.items);
            // Math.ceil(Math.min(100, 1000) / 30) = Math.ceil(100 / 30) = 4
            expect(result.current.totalPages).toBe(0);
        });

        test("API呼び出しが成功したが、total_countが0の場合、Not Foundのエラーがセットされるか", async () => {
            mockValidateGitHubRepos.mockReturnValue(true);

            mockFetchGitHubRepos.mockResolvedValue({
                status: 200,
                data: {
                    total_count: 0,
                    items: [],
                },
            });

            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("unknown-repo", 1);
            });

            expect(result.current.loading).toBe(false);
            expect(result.current.results).toEqual([]);
            expect(result.current.totalPages).toBe(0);
            expect(result.current.error).toBe("検索条件に一致するリポジトリはありませんでした");
        });

        test("API呼び出しが成功したが、dataがnullの場合、Not Foundのエラーがセットされているか", async () => {
            mockValidateGitHubRepos.mockReturnValue(true);

            // ボディをNullに
            mockFetchGitHubRepos.mockResolvedValue({
                status: 200,
                data: null,
            });

            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("react", 1);
            });

            expect(result.current.error).toBe("検索条件に一致するリポジトリはありませんでした");
            expect(result.current.results).toEqual([]);
        });

        test("APIエラー（ステータスコードが200以外）の場合、レスポンスのメッセージがエラーとしてセットされるか", async () => {
            mockValidateGitHubRepos.mockReturnValue(true);
            mockFetchGitHubRepos.mockResolvedValue({
                status: 403,
                message: "API rate limit exceeded",
            });

            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("react", 1);
            });

            expect(result.current.loading).toBe(false);
            expect(result.current.results).toEqual([]);
            expect(result.current.totalPages).toBe(0);
            expect(result.current.error).toBe("API rate limit exceeded");
        });

        test("APIエラー時にレスポンスにメッセージがない場合、デフォルトのエラーメッセージがセットされるか", async () => {
            mockValidateGitHubRepos.mockReturnValue(true);
            mockFetchGitHubRepos.mockResolvedValue({
                status: 500,
                // messageが含まれないケース
            });

            const { result } = renderHook(() => useGitHubRepos());

            await act(async () => {
                await result.current.searchRepos("react", 1);
            });

            expect(result.current.error).toBe("API呼び出し時にエラーが発生しました");
        });
    });
});