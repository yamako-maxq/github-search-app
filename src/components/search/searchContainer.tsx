'use client';

import { useState } from 'react';
import SearchPresenter from './searchPresenter';
import { useGitHubSearch } from '@/hooks/useGitHubSearch';

export default function SearchFormContainer() {
    // GitHub検索のロジックをカスタムフックから取得
    const {
        results,
        loading,
        error,
        totalPages,
        searchRepositories
    } = useGitHubSearch();

    // 検索クエリとページ番号の状態を管理
    const [query, setQuery] = useState('');
    const [activePage, setActivePage] = useState(1);

    // 検索実行時の処理
    const handleSearchClick = () => {
        setActivePage(1);
        searchRepositories(query, 1);
    };

    // ページ変更時の処理
    const handlePageChange = (page: number) => {
        setActivePage(page);
        searchRepositories(query, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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