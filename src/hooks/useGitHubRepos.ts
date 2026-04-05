import { useState } from 'react';
import { GitHubRepository, GitHubSearchResponse } from '@/types/github';
import { fetchGitHubRepos } from '@/utils/apis/fetchGitHubRepos';
import { validateGitHubRepos } from '@/utils/validations/gitHubRepos';

// 定数を外部ファイルに切り出すことを推奨
const PER_PAGE = 30;
const MAX_RESULTS = 1000;

export const useGitHubRepos = () => {
    const [results, setResults] = useState<GitHubRepository[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);

    // GitHubリポジトリを検索する
    const searchRepos = async (query: string, page: number) => {
        if (query.trim() === '') return;
        if(!validateGitHubRepos(query)){
            setError("入力値が正しくありません")
        }
        const initFetch = () => {
            setResults([]);
            setLoading(true);
            setError(null);
        }

        const resetHandler = () => {
            setResults([]);
            setTotalPages(0);
        }

        initFetch()
        const response = await fetchGitHubRepos(query, page, PER_PAGE);
        if (response.status === 200) {
            const data = response.data ? response.data as GitHubSearchResponse : null;
            if (!data) {
                throw new Error("API呼び出し時にエラーが発生しました")
            }
            if (data.total_count === 0) {
                resetHandler()
                setError("検索条件に一致するリポジトリはありませんでした");
            }
            setResults(data.items);
            const totalCount = Math.min(data.total_count, MAX_RESULTS);
            setTotalPages(Math.ceil(totalCount / PER_PAGE));
        } else {
            resetHandler()
            setError(response.message ?? "API呼び出し時にエラーが発生しました")
        }
        setLoading(false);
    };

    return { results, loading, error, totalPages, searchRepos };
};