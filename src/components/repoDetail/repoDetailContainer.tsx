import RepoDetailPresentation from "./repoDetailPresenter";
import { GitHubRepository } from "@/types/github";
import { Container, Text, Button, Center, Stack } from "@mantine/core";
import Link from "next/link";

// Propsの型を定義
type DetailPageProps = {
    owner: string;
    repo: string;
}

export default async function RepoDetailContainer({ owner, repo }: DetailPageProps) {
    const detail = await getRepository(owner, repo);

    // エラーハンドリング（リポジトリが見つからない、またはAPI制限）
    if (!detail) {
        return (
            <Container size="sm" py="xl">
                <Center style={{ height: "50vh" }}>
                    <Stack align="center" gap="md">
                        <Text size="xl" fw={700} c="red">リポジトリが見つかりませんでした</Text>
                        <Text c="dimmed">URLが正しいか、APIの制限に達していないか確認してください。</Text>
                        <Button component={Link} href="/" variant="light" mt="md">
                            検索画面へ戻る
                        </Button>
                    </Stack>
                </Center>
            </Container>
        );
    }

    // 取得したデータをPresenterに渡して描画
    return <RepoDetailPresentation detail={detail} />;
}



/**
 * サーバーサイドでのデータフェッチ
 */
async function getRepository(owner: string, repo: string): Promise<GitHubRepository | null> {
    const token = process.env.GITHUB_TOKEN;

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
            // トークンがある場合はヘッダーに追加してレートリミットを緩和
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Accept": "application/vnd.github.v3+json",
            "X-GitHub-Api-Version": "2026-03-10",
        },
        // キャッシュ戦略: 60秒ごとにバックグラウンドで再検証(ISR)
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        console.error(`GitHub API Error: ${res.status} ${res.statusText}`);
        return null;
    }

    return res.json();
}