import { httpResponse } from "@/types/httpResponse";
import { GitHubSearchResponse } from '@/types/github';

const API_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL;
if (!API_URL) {
    throw new Error("GitHub APIのURLが設定されていません。");
}

/**
 * GitHubのリポジトリを検索する
 * @param searchQuery 検索クエリ
 * @param page ページ番号
 * @param perPage 1ページあたりの結果数
 */
export const fetchGitHubRepos = async (
    searchQuery: string,
    page: number,
    perPage: number
): Promise<httpResponse<GitHubSearchResponse>> => {

    // APIリクエストのクエリパラメータを構築
    const params = new URLSearchParams({
        q: searchQuery,
        page: page.toString(),
        per_page: perPage.toString(),
    });

    const res = await fetch(`${API_URL}/search/repositories?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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
                    message: "リクエストに失敗しました"
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

/**
 * APIリクエストのパラメータを検証する
 * @param page ページ番号
 * @param perPage 1ページあたりの結果数
 */
export const validateParams = (page: number, perPage: number): void => {
    if (page < 1) {
        throw new Error("ページ番号は1以上である必要があります。");
    }
    if (perPage < 1 || perPage > 100) {
        throw new Error("1ページあたりの結果数は1から100の間である必要があります。");
    }
};