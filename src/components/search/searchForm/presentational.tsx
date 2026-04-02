"use client";
import { GitHubRepository } from '@/types/github';
import { TextInput, Button, Group } from '@mantine/core';

interface SearchFormPresenterProps {
    query: string;
    loading: boolean;
    results: GitHubRepository[];
    onQueryChange: (val: string) => void;
    onSearch: () => void;
}

export default function SearchFormPresentation({
    query,
    loading,
    onQueryChange,
    onSearch,
}: SearchFormPresenterProps) {
    return (
        <Group align="flex-end">
            <TextInput
                label="Repository Name"
                placeholder="e.g. react"
                value={query}
                onChange={(e) => onQueryChange(e.currentTarget.value)}
                style={{ flex: 1 }}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <Button onClick={onSearch} loading={loading}>
                Search
            </Button>
        </Group>
    );
}