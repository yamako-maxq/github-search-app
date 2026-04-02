import SearchFormPresentation from "./presentational";

interface SearchFormContainerProps {
    query: string;
    loading: boolean;
    results: GitHubRepository[];
    error: string | null;
    onQueryChange: (val: string) => void;
    onSearch: () => void;
}

export default function SearchFormContainer(props: SearchFormContainerProps) {
    return <SearchFormPresentation {...props} />;
}