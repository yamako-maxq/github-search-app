import { GitHubRepository } from '@/src/types/github';
import { Container, TextInput, Button, Group, Card, Text, Stack, Title, Avatar, Grid } from '@mantine/core';
import Link from 'next/link';

interface SearchPresenterProps {
    query: string;
    loading: boolean;
    results: GitHubRepository[];
    error: string | null;
    onQueryChange: (val: string) => void;
    onSearch: () => void;
}

export default function SearchPresentation({
    query,
    loading,
    results,
    error,
    onQueryChange,
    onSearch,
}: SearchPresenterProps) {
    return (
        <Container size="md" py="sm">
            <Stack gap="xl">
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

                {error && <Text c="red">{error}</Text>}

                <Grid>
                    <Grid.Col span={{ base: 12 }}>
                        {results.map((repo) => (
                            <>
                                {/* 新しいカードデザイン: カード全体をLinkとして振る舞わせる */}
                                <Card
                                    key={repo.id}
                                    shadow="none" // 影なし
                                    padding="lg" // パディング（ワイヤーフレームに合わせて調整）
                                    radius="md" // 角丸
                                    withBorder // 境界線あり
                                    component={Link} // Linkコンポーネントとしてレンダリング
                                    href={`/repo/${repo.owner.login}/${repo.name}`}
                                    style={{
                                        textDecoration: 'none', // リンクの下線を削除
                                        color: 'inherit', // テキスト色を継承
                                        cursor: 'pointer', // ポインターカーソルを表示
                                        transition: 'border-color 0.2s ease', // ホバー時のアニメーション
                                    }}
                                >
                                    <Group wrap="nowrap" gap="lg">
                                        <Avatar
                                            src={repo.owner.avatar_url}
                                            size={60} // サイズをワイヤーフレームに合わせて大きめに
                                            radius="xl" // 円形に
                                            color="blue" // 画像がない場合のプレースホルダー
                                            alt={`${repo.owner.login}'s avatar`}
                                        />

                                        {/* リポジトリ名 */}
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <Text
                                                fw={500}
                                                size="lg" // 文字サイズを大きめに
                                                truncate // 長い名前を三点リーダーで省略
                                                c="dark.9" // 標準的な黒
                                            >
                                                {repo.name} {/* フルネームではなく名前のみ表示 */}
                                            </Text>
                                            {/* 必要に応じてownerも表示できます */}
                                            {/* <Text size="sm" c="dimmed">by {repo.owner.login}</Text> */}
                                        </div>
                                    </Group>
                                </Card>
                            </>
                        ))}
                    </Grid.Col>
                </Grid>
            </Stack >
        </Container >
    );
}