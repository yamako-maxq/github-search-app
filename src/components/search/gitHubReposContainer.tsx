'use client';
import { useEffect } from 'react';
import { useQueryState, parseAsInteger } from "nuqs";
import SearchPresenter from './gitHubReposPresenter';
import { useGitHubRepos } from '@/hooks/useGitHubRepos';

export default function SearchGitHubReposContainer() {
    // GitHub検索のロジックをカスタムフックから取得
    const {
        results,
        loading,
        error,
        totalPages,
        searchRepos
    } = useGitHubRepos();

    // 検索クエリの管理
    const [query, setQuery] = useQueryState("q", { defaultValue: "" });

    // ページネーション
    const [activePage, setActivePage] = useQueryState("page", parseAsInteger.withDefault(0));

    // 検索実行時の処理
    const handleSearchClick = () => {
        setActivePage(1);
        searchRepos(query, 1);
    };

    // ページ変更時の処理
    const handlePageChange = (page: number) => {
        setActivePage(page);
        searchRepos(query, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setActivePage(activePage);
        searchRepos(query, activePage);
    }, [activePage, query, searchRepos, setActivePage])

    return (
        <SearchPresenter
            query={query}
            totalPages={totalPages}
            activePage={activePage}
            loading={loading}
            results={results}
            error={error}
            onQueryChange={setQuery}
            onPageChange={handlePageChange}
            onSearch={handleSearchClick}
        />
    );
}