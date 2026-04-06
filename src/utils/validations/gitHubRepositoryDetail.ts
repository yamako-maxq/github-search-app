/**
 * リポジトリ詳細のリクエストパラメーターを検証する
 * @param owner string - リポジトリの所有者
 * @param repo string - リポジトリ名
 * @returns boolean 正常：true 以上：false
 */
export const validateGitHubRepositoryDetail = (owner: string, repo: string): boolean => {
    // githubのユーザー数とリポジトリ名は最大39文字だが、
    // 変更される可能性を考慮、かつReDoS攻撃の危険性も考慮し、最大1000文字とする
    const ownerRegex = /^[a-zA-Z0-9-]{1,1000}$/;
    const repoRegex = /^[a-zA-Z0-9_.-]{1,1000}$/;
    return ownerRegex.test(owner) && repoRegex.test(repo);
};