// GiHubのオーナーを表すインターフェース
export interface GitHubOwner {
    login: string;
    avatar_url: string;
}

// GitHubのリポジトリを表すインターフェース
export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    owner: GitHubOwner;
    description: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    language: string;
    html_url: string;
}

// GitHubのリポジトリ検索APIのレスポンスを表すインターフェース
export interface GitHubSearchResponse {
    total_count: number;
    items: GitHubRepository[];
}