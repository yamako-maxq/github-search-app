// import SearchPresentation from "./presentational";
'use client';

import { useState } from 'react';
import SearchPresentation from './presentational';
import { GitHubRepository, GitHubSearchResponse } from '@/src/types/github';

export default function SearchFormContainer() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<GitHubRepository[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error('Failed to fetch repositories');
            const data: GitHubSearchResponse = await res.json();
            setResults(data.items || []);
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchPresentation
            query={query}
            loading={loading}
            results={results}
            error={error}
            onQueryChange={setQuery}
            onSearch={handleSearch}
        />
    );
}