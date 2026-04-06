// api.test.ts
import { fetchGitHubRepos } from "./fetchGitHubRepos";
import { repositoryMockResponse } from "@/utils/contains/tests/gitHubApi.mock";

describe('fetchGitHubRepos', () => {
    beforeEach(() => {
        // fetchをモック化
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks(); // モックをリセット
    });

    it("200エラーの場合", async () => {
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => repositoryMockResponse
        });

        // 実行
        const result = await fetchGitHubRepos("", 1, 2);

        // ステータスコードが200か
        expect(result.status).toEqual(200);

        // 戻り値が正しいか
        expect(result.data).toEqual(repositoryMockResponse);
    });

    it("200エラーの場合(トークンあり)", async () => {
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => repositoryMockResponse
        });

        // 実行
        const result = await fetchGitHubRepos("", 1, 2, {
            token: "token"
        });

        // ステータスコードが200か
        expect(result.status).toEqual(200);
        
        // 戻り値が正しいか
        expect(result.data).toEqual(repositoryMockResponse);
    });

    it("200エラーの場合(トークンがundefined)", async () => {
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => repositoryMockResponse
        });

        // 実行
        const result = await fetchGitHubRepos("", 1, 2, {
            token: undefined
        });

        // ステータスコードが200か
        expect(result.status).toEqual(200);

        // 戻り値が正しいか
        expect(result.data).toEqual(repositoryMockResponse);
    });

    it("403エラーの場合", async () => {
        const status = 403;
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: status,
            json: async () => null
        });
        const result = await fetchGitHubRepos("", 1, 2);
        expect(result.status).toEqual(status);

    });

    it("422エラーの場合", async () => {
        const status = 422;
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: status,
            json: async () => null
        });
        const result = await fetchGitHubRepos("", 1, 2);
        expect(result.status).toEqual(status);

    });

    it("503エラーの場合", async () => {
        const status = 503;
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: status,
            json: async () => null
        });
        const result = await fetchGitHubRepos("", 1, 2);
        expect(result.status).toEqual(status);

    });

    it("500エラーの場合", async () => {
        const status = 500;
        // モックの実装
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: status,
            json: async () => null
        });
        const result = await fetchGitHubRepos("", 1, 2);
        expect(result.status).toEqual(status);
    });
});