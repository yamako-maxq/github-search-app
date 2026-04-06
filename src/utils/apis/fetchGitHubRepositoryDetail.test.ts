// api.test.ts
import { fetchGitHubRepositoryDetail } from "./fetchGitHubRepositoryDetail";
import { repositoryMockResponse } from "@/utils/contains/tests/gitHubApi.mock";

describe('fetchGitHubRepositoryDetail', () => {
    beforeEach(() => {
        // fetchをモック化
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks(); // モックをリセット
    });


    test("200エラーの場合", async () => {
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => repositoryMockResponse
        });

        // 実行
        const result = await fetchGitHubRepositoryDetail("owner", "repo");

        // ステータスコードが200か
        expect(result.status).toEqual(200);

        // レスポンスデータが正常に返されているか
        expect(result.data).toEqual(repositoryMockResponse);
    });

    test("200エラーの場合(トークンあり)", async () => {
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => repositoryMockResponse
        });
        const result = await fetchGitHubRepositoryDetail("owner", "repo", {
            token: "token"
        });
        // ステータスコードが200か
        expect(result.status).toEqual(200);

        // レスポンスデータが正常に返されているか
        expect(result.data).toEqual(repositoryMockResponse);
    });

    test("200エラーの場合(トークンがundefined)", async () => {
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => repositoryMockResponse
        });
        const result = await fetchGitHubRepositoryDetail("owner", "repo", {
            token: undefined
        });
        // ステータスコードが200か
        expect(result.status).toEqual(200);

        // レスポンスデータが正常に返されているか
        expect(result.data).toEqual(repositoryMockResponse);
    });

    test("403エラーの場合", async () => {
        const status = 403;
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: status,
            json: async () => repositoryMockResponse
        });
        const result = await fetchGitHubRepositoryDetail("owner", "repo");
        // ステータスコードが403か
        expect(result.status).toEqual(status);
    });

    test("404エラーの場合", async () => {
        const status = 404;
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: status,
            json: async () => repositoryMockResponse
        });
        const result = await fetchGitHubRepositoryDetail("owner", "repo");
        // ステータスコードが404か
        expect(result.status).toEqual(status);
    });

    test("500エラーの場合", async () => {
        const status = 500;
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: status,
            json: async () => repositoryMockResponse
        });
        const result = await fetchGitHubRepositoryDetail("owner", "repo");
        // ステータスコードが500か
        expect(result.status).toEqual(status);
    });
});