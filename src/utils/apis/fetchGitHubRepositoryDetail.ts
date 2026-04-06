import { httpResponse } from "@/types/httpResponse";
import { GitHubRepository } from "@/types/github";

type Option = {
    token?: string
}

/**
 * リポジトリ詳細のAPIを取得する関数
 * @param owner string - リポジトリの所有者
 * @param repo string - リポジトリ名
 * @returns Promise<httpResponse<GitHubRepository>> - レスポンス
 */
export const fetchGitHubRepositoryDetail = async (owner: string, repo: string, option?: Option): Promise<httpResponse<GitHubRepository>> => {
    const token = option?.token || undefined
    const res = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/repos/${owner}/${repo}`, {
        headers: {
            // トークンがある場合はヘッダーに追加してレートリミットを緩和
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Accept": "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2026-03-10",
        },
        // キャッシュ戦略: 60秒ごとにバックグラウンドで再検証
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        switch (res.status) {
            case 403:
                console.error("API rate limit exceeded");
                return {
                    status: res.status,
                    message: "APIのリクエスト制限に達しました しばらくしてから再度お試しください"
                };
            case 404:
                // リポジトリが見つからない場合はnullを返す
                console.error("Repository not found");
                return {
                    status: res.status,
                    message: "リポジトリが見つかりません"
                };
            default:
                console.error(`API Fetch Failed Status: ${res.status}`);
                return {
                    status: res.status,
                    message: "APIリクエストに失敗しました。"
                };
        }
    }
    const data: GitHubRepository = await res.json();
    return {
        status: res.status,
        data: data
    };
};