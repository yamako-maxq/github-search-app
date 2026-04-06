import { GitHubRepository, GitHubSearchResponse } from "@/types/github";

export const repositoryMockResult: GitHubRepository = {
    "id": 1,
    "name": "github-search-app",
    "full_name": "yamako-maxq/github-search-app",
    "owner": {
        "login": "yamako-maxq",
        "avatar_url": "https://avatars.githubusercontent.com/u/45232691?v=4",
    },
    "description": "GitHubのリポジトリーを検索するwebアプリケーションです",
    "stargazers_count": 0,
    "watchers_count": 0,
    "forks_count": 0,
    "open_issues_count": 0,
    "language": "TypeScript",
    "html_url": "https://github.com/yamako-maxq/github-search-app",
}

export const repositoryMockResults: GitHubRepository[] = [
    {
        ...repositoryMockResult,
        "id": 1,
    },
    {
        ...repositoryMockResult,
        "id": 2,
    },
    {
        ...repositoryMockResult,
        "id": 3,
    },
]

export const repositoryMockResponse: GitHubSearchResponse = {
    total_count: 1,
    items: repositoryMockResults
}