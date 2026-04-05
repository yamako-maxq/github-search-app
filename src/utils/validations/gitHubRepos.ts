/**
 * リポジトリ検索のリクエストパラメーターを検証する
 * @param query string - 検索ワード
 * @returns boolean 正常：true 以上：false
 */
export const validateGitHubRepos = (query: string): boolean => {
    // 1文字以上、最大1000文字
    return query.length > 0 && query.length <= 1000
};