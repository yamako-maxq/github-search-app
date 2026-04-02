import SearchFormPresentation from "./presentational";
import { GitHubRepository } from '@/src/types/github';

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