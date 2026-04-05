/**
 * リポジトリ検索のリクエストパラメーターを検証する
 * @param query string - 検索ワード
 * @returns boolean 正常：true 以上：false
 */
export const validateGitHubRepos = (query: string, page: number): boolean => {
    // 1文字以上、最大1000文字ではない場合はエラー
    if (query.length < 1 || query.length >= 1000) {
        return false
    }

    // ページは1以上1000以下ではない場合はエラー
    if (page < 1 || page >= 1000) {
        return false
    }
    return true
};