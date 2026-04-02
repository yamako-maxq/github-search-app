// import SearchPresentation from "./presentational";
'use client';

import { useState } from 'react';
import SearchPresentation from './searchPresenter';
import { GitHubRepository, GitHubSearchResponse } from '@/types/github';

// GitHub APIのページネーションに関する定数
// 1ページあたりのアイテム数（GitHub APIのデフォルトは30）
const PER_PAGE = 30;

// GitHub APIは最大1000件までしか返さないため、最大ページ数を設定
const MAX_RESULTS = 1000; // GitHub APIの制限

export default function SearchFormContainer() {
    const [query, setQuery] = useState(''); // 入力データの管理
    const [results, setResults] = useState<GitHubRepository[]>([]); // APIからのレスポンス管理
    const [loading, setLoading] = useState(false); // ローディング状態の管理

    // ページネーション管理
    const [activePage, setActivePage] = useState(1); // 現在のページ
    const [totalPages, setTotalPages] = useState(0); // 総ページ数

    const [error, setError] = useState<string | null>(null); // エラー状態の管理

    // 検索処理
    // APIドキュメント：
    // https://docs.github.com/ja/rest/search/search?apiVersion=2026-03-10
    const fetchRepositories = async (searchQuery: string, page: number) => {
        // クエリが空白のみの場合は検索しない
        if (!searchQuery.trim()) return;

        // ローディング開始
        setLoading(true);

        // エラーリセット
        setError(null);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_GITHUB_API_URL}/search/repositories`;
            const params = {
                q: searchQuery,
                page: page.toString(),
                per_page: `${PER_PAGE}`, // 1ページあたりのアイテム数
            };
            const queryParams = new URLSearchParams(params);

            const option = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await fetch(`${apiUrl}?${queryParams}`, option);

            if (!res.ok) throw new Error('Failed to fetch repositories');
            const data: GitHubSearchResponse = await res.json();
            setResults(data.items || []);

            // 総ページ数の計算
            const totalCount = Math.min(data.total_count, MAX_RESULTS); // GitHub APIの制限を考慮
            setTotalPages(Math.ceil(totalCount / PER_PAGE));
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            // エラー発生時は結果をリセット
            setResults([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };

    // 検索ボタンクリック時（1ページ目に戻して検索）
    const handleSearchClick = () => {
        setActivePage(1);
        fetchRepositories(query, 1);
    };

    // ページ変更時
    const handlePageChange = (page: number) => {
        setActivePage(page);
        fetchRepositories(query, page);
        // ページ上部へスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <SearchPresentation
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