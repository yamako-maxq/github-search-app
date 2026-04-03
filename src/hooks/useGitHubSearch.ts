import { useState } from 'react';
import { GitHubRepository } from '@/types/github';
import { fetchGitHubRepositories } from '@/utils/apis/gitHubRepositories';

// 定数を外部ファイルに切り出すことを推奨
const PER_PAGE = 30;
const MAX_RESULTS = 1000;

export const useGitHubSearch = () => {
    const [results, setResults] = useState<GitHubRepository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);

    // GitHubリポジトリを検索する
    const searchRepositories = async (query: string, page: number) => {
        if (query.trim() === '') return;

        setLoading(true);
        setError(null);

        try {
            const data = await fetchGitHubRepositories(query, page, PER_PAGE);
            const items = data.items || [];
            if (items.length === 0) {
                throw new Error("検索条件に一致するリポジトリはありませんでした");
            }
            setResults(items);
            const totalCount = Math.min(data.total_count, MAX_RESULTS);
            setTotalPages(Math.ceil(totalCount / PER_PAGE));
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
            setResults([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, totalPages, searchRepositories };
};