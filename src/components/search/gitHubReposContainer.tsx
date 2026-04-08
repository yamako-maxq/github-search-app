"use client";
import { useEffect } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import SearchPresenter from "./gitHubReposPresenter";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";

/**
 * リポジトリの検索ページを表示するプレゼンテーションコンポーネント
 */
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 初回表示時に、検索条件があれば検索を行う
    const handleFirstLoad = () => {
        if (query.trim() === "") return;
        setActivePage(activePage);
        searchRepos(query, activePage);
    }
    
    useEffect(() => {
        handleFirstLoad()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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