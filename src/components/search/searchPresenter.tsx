import { GitHubRepository } from '@/types/github';
import {
    Container,
    TextInput,
    Button,
    Group,
    Card,
    Text,
    Stack,
    Avatar,
    Grid,
    Center,
    Skeleton,
    Pagination
} from '@mantine/core';
import Link from 'next/link';

interface SearchPresenterProps {
    query: string;
    loading: boolean;
    results: GitHubRepository[];
    error: string | null;
    activePage: number;
    totalPages: number;
    onSearch: () => void;
    onQueryChange: (val: string) => void;
    onPageChange: (page: number) => void;
}

/** 
 * SearchPresentation component
 * リポジトリの検索結果を表示するプレゼンテーションコンポーネント
 * 
 * @param query - 検索クエリ
 * @param loading - ロード状態
 * @param results - 検索結果のリポジトリリスト
 * @param error - エラーメッセージ
 * @param activePage - 現在のページ番号
 * @param totalPages - 総ページ数
 * @param onQueryChange - クエリ変更時の処理
 * @param onSearch - 検索実行時の処理
 * @param onPageChange - ページ変更時の処理
 * 
 * @returns リポジトリの検索結果
 */
export default function SearchPresentation({
    query,
    loading,
    results,
    activePage,
    totalPages,
    error,
    onQueryChange,
    onSearch,
    onPageChange
}: SearchPresenterProps) {
    return (
        <Container size="md" py="sm">
            <Stack gap="md">
                {/* 検索バーおよびボタン */}
                <SearchInput
                    query={query}
                    onQueryChange={onQueryChange}
                    onSearch={onSearch}
                    loading={loading}
                />

                {/* エラー表示 */}
                {error && <Text c="red">{error}</Text>}

                {/* 検索結果 */}
                <Grid>
                    <Grid.Col span={{ base: 12 }}>
                        {loading ? (
                            <SearchSkeleton />
                        ) : (
                            <SearchList results={results} />
                        )}

                        {/* 結果がある場合のみページネーションを表示 */}
                        {results.length > 0 && totalPages > 1 && (
                            <Center my="lg">
                                <SearchPagination
                                    activePage={activePage}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                />
                            </Center>
                        )}
                    </Grid.Col>
                </Grid>

            </Stack >
        </Container >
    );
}

// SearchPresenterPropsから必要な型を抽出
type SearchInputProps = Pick<SearchPresenterProps,
    "query" | "onQueryChange" | "onSearch" | "loading"
>;
/** 
 * SearchInput component
 * リポジトリの検索入力欄を表示するコンポーネント
 * 
 * @param query - 検索クエリ
 * @param onQueryChange - クエリ変更時の処理
 * @param onSearch - 検索実行時の処理
 * @param loading - ロード状態
 * 
 * @returns 検索入力欄
 */
export function SearchInput({ query, onQueryChange, onSearch, loading }: SearchInputProps) {
    return (
        <Group align="flex-end">
            <TextInput
                size={"md"}
                placeholder="リポジトリ名を検索してください"
                value={query}
                onChange={(e) => onQueryChange(e.currentTarget.value)}
                style={{ flex: 1 }}
                aria-label="search-input"
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <Button
                size={"md"}
                w={120}
                onClick={onSearch}
                loading={loading}
            >
                検索
            </Button>
        </Group>
    );
}

// SearchPresenterPropsから必要な型を抽出
type SearchListProps = Pick<SearchPresenterProps, 'results'>;
/** 
 * SearchList component
 * リポジトリの検索結果を表示するコンポーネント
 * 
 * @param results - 検索結果のリポジトリリスト
 * 
 * @returns リポジトリのリスト
 */
export function SearchList({ results }: SearchListProps) {
    return (
        <div aria-label="search-results">
            {
                results.map((repo: GitHubRepository) => (
                    <Card
                        key={repo.id}
                        shadow="none"
                        padding="lg"
                        radius="md"
                        withBorder
                        component={Link}
                        href={`/repo/${repo.owner.login}/${repo.name}`}
                        my={"lg"}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s ease',
                        }}
                    >
                        <Group wrap="nowrap" gap="lg">
                            {/* オーナーのアバター */}
                            <Avatar
                                src={repo.owner.avatar_url}
                                size={60}
                                radius="xl"
                                color="blue"
                                alt={`${repo.owner.login}'s avatar`}
                            />

                            {/* リポジトリ名 */}
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <Text
                                    fw={500}
                                    size="lg"
                                    truncate
                                >
                                    {repo.name}
                                </Text>
                            </div>
                        </Group>
                    </Card>
                ))
            }
        </div>
    )
}

// SearchPresenterPropsから必要な型を抽出
type PaginationProps = Pick<SearchPresenterProps, 'activePage' | 'totalPages' | 'onPageChange'>;
/** 
 * SearchPagination component
 * ページネーションを表示するコンポーネント
 * 
 * @param activePage - 現在のページ番号
 * @param totalPages - 総ページ数
 * @param onPageChange - ページ変更時のコールバック関数
 * 
 * @returns ページネーションコンポーネント
*/
export function SearchPagination({ activePage, totalPages, onPageChange }: PaginationProps) {
    return (
        <Center my="lg">
            <Pagination
                id="search-pagination"
                total={totalPages}
                value={activePage}
                onChange={onPageChange}
                aria-label={"pagination"}
            />
        </Center>
    )
}

/** 
 * SearchSkeleton component
 * リポジトリの検索結果がロード中のときに表示されるスケルトンコンポーネント
 * 
 * @param count - 表示するスケルトンの数（デフォルトは5）
 * 
 * @returns スケルトンのリスト
*/
export function SearchSkeleton({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} shadow="none" padding="lg" radius="md" withBorder my="lg">
                    <Group wrap="nowrap" gap="lg">
                        {/* アバター部分のスケルトン */}
                        <Skeleton height={60} circle />

                        {/* テキスト部分のスケルトン */}
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <Skeleton height={24} width="60%" radius="xl" />
                        </div>
                    </Group>
                </Card>
            ))}
        </>
    );
}