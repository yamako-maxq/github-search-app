import { useState, useCallback } from "react";
import { config } from "@/config/config";
import { GitHubRepository, GitHubSearchResponse } from "@/types/github";
import { fetchGitHubRepos } from "@/utils/apis/fetchGitHubRepos";
import { validateGitHubRepos } from "@/utils/validations/gitHubRepos";

/**
 * gitHubのリポジトリ情報を取得するカスタムフックス
 */
export const useGitHubRepos = () => {
    const [results, setResults] = useState<GitHubRepository[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);

    // GitHubリポジトリを検索する
    const searchRepos = useCallback(async (query: string, page: number) => {
        if (query.trim() === "") return;
        if (!validateGitHubRepos(query, page)) {
            setError("リクエストされた値が正しくありません")
            return
        }
        const initFetch = () => {
            setResults([]);
            setLoading(true);
            setError(null);
        }

        const notFoundHandler = () => {
            resetHandler()
            setError("検索条件に一致するリポジトリはありませんでした")
        }

        const calcTotalPageHandler = (totalCount: number, maxResults: number, perPage: number): number => {
            const minTotalCount = Math.min(totalCount, maxResults);
            return Math.ceil(minTotalCount / perPage);
        }

        const resetHandler = () => {
            setResults([]);
            setTotalPages(0);
        }
        initFetch()
        const response = await fetchGitHubRepos(query, page, config.api.searchReposPerPage);
        setLoading(false);
        if (response.status === 200) {
            const data = response.data ? response.data as GitHubSearchResponse : null;
            const items = data?.items || []
            if (!data) {
                notFoundHandler()
                return
            } else if (data.total_count === 0 || data.items.length === 0) {
                notFoundHandler()
                return
            }
            setResults(items);
            setTotalPages(
                calcTotalPageHandler(
                    data.total_count,
                    config.api.searchReposMaxResults,
                    config.api.searchReposPerPage,
                )
            )
            return
        } else {
            setError(response.message ?? "API呼び出し時にエラーが発生しました")
            resetHandler()
            return
        }
    }, [])

    return { results, loading, error, totalPages, searchRepos };
};