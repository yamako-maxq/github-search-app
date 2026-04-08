import { httpResponse } from "@/types/httpResponse";
import { GitHubSearchResponse } from "@/types/github";

type Option = {
    token?: string
}

/**
 * GitHubのリポジトリを検索する
 * @param searchQuery 検索クエリ
 * @param page ページ番号
 * @param perPage 1ページあたりの結果数
 * @returns Promise<httpResponse<GitHubSearchResponse>> - レスポンス
 */
export const fetchGitHubRepos = async (
    searchQuery: string,
    page: number,
    perPage: number,
    option?: Option
): Promise<httpResponse<GitHubSearchResponse>> => {

    // APIリクエストのクエリパラメータを構築
    const params = new URLSearchParams({
        q: searchQuery,
        page: page.toString(),
        per_page: perPage.toString(),
    });
    const token = option?.token || undefined
    const res = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/search/repositories?${params}`, {
        method: "GET",
        headers: {
            // トークンがある場合はヘッダーに追加してレートリミットを緩和
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2026-03-10",
        },
        cache: "force-cache"
    });

    if (!res.ok) {
        switch (res.status) {
            case 403:
                console.error("API rate limit exceeded");
                return {
                    status: res.status,
                    message: "APIのリクエスト制限に達しました しばらくしてから再度お試しください"
                };
            case 422:
                console.error("Validation failed");
                return {
                    status: res.status,
                    message: "リクエストされた値が正しくありません"
                };
            case 503:
                // リポジトリが見つからない場合はnullを返す
                console.error("Service unavailable");
                return {
                    status: res.status,
                    message: "サーバーエラーが発生しました"
                };
            default:
                console.error(`API Fetch Failed Status: ${res.status}`);
                return {
                    status: res.status,
                    message: "APIリクエストに失敗しました。"
                };
        }
    }
    const data: GitHubSearchResponse = await res.json();

    // レスポンスをJSON形式で返す
    return {
        status: res.status,
        data: data
    }

};