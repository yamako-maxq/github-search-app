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
export const fetchGitHubRepositories = async (
    searchQuery: string,
    page: number,
    perPage: number
): Promise<GitHubSearchResponse> => {
    if (!searchQuery.trim()) return { total_count: 0, items: [] };
    // APIリクエストのパラメータを検証
    validateParams(page, perPage);

    // APIリクエストのクエリパラメータを構築
    const params = new URLSearchParams({
        q: searchQuery,
        page: page.toString(),
        per_page: perPage.toString(),
    });

    const res = await fetch(`${API_URL}/search/repositories?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    // APIレスポンスのエラーハンドリング
    handleResponseError(res);

    // レスポンスをJSON形式で返す
    return res.json();
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

/**
 * APIレスポンスのエラーハンドリング
 * @param res APIレスポンス
 */
export const handleResponseError = (res: Response): void => {
    if (!res.ok) {
        const errorMessages: Record<number, string> = {
            403: "APIのリクエスト制限に達しました しばらくしてから再度お試しください",
            422: "検索クエリが無効です 別のキーワードで試してください",
            503: "サーバーエラーが発生しました しばらくしてから再度お試しください",
        };
        throw new Error(errorMessages[res.status] || "APIリクエストに失敗しました。");
    }
};