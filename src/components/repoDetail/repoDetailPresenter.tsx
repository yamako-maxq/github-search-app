import { GitHubRepository } from '@/types/github';
import {
    Container,
    Card,
    Text,
    Group,
    Avatar,
    Badge,
    Stack,
    Title,
    SimpleGrid,
    Paper,
    Box,
    Button,
    Center,
} from '@mantine/core';
import {
    IconStar,
    IconEye,
    IconGitFork,
    IconAlertCircle
} from '@tabler/icons-react';
import Link from "next/link";

interface DetailPresentationProps {
    detail: GitHubRepository | null;
    errorMessage?: string;
}

/** 
 * リポジトリの詳細を表示するプレゼンテーションコンポーネント
 * @param detail DetailPresentationProps - リポジトリの詳細情報
 * @param errorMessage string - エラーメッセージ
 * @returns リポジトリ詳細の検索結果
 */
export default function RepoDetailPresentation({ detail, errorMessage }: {
    detail: GitHubRepository | null;
    errorMessage?: string;
}) {
    return (
        <Container size="md" py="xl">
            <Stack gap="md">
                {detail ? (
                    <DetailCard
                        avatar_url={detail.owner.avatar_url}
                        name={detail.name}
                        language={detail.language}
                        stargazers_count={detail.stargazers_count}
                        watchers_count={detail.watchers_count}
                        forks_count={detail.forks_count}
                        open_issues_count={detail.open_issues_count}
                    />
                ) : (
                    <ErrorCard
                        errorMessage={errorMessage || "リポジトリの詳細情報を取得できませんでした。"}
                    />
                )}
            </Stack>
        </Container>
    );
}

/**
 * エラーメッセージを表示するコンポーネント
 * @param errorMessage string - エラーメッセージ
 * @returns エラーメッセージのコンポーネント
 */
function ErrorCard({ errorMessage }: { errorMessage: string }) {
    return (
        <Center style={{ height: "50vh" }}>
            <Card padding="md" radius="md" withBorder>
                <Group align="center" mb="lg">
                    <IconAlertCircle size={40} color="var(--mantine-color-red-6)" />
                    <Box style={{ flex: 1 }}>
                        <Title order={3} mb={"5px"}>エラー</Title>
                        <Text c="dimmed">{errorMessage}</Text>
                    </Box>
                </Group>
                <Link href="/" passHref>
                    <Button w={"100%"} component="a" variant="outline" mt="md">
                        戻る
                    </Button>
                </Link>
            </Card>
        </Center>
    );
}

/**
 * リポジトリの詳細情報を表示するコンポーネント
 * @param detail GitHubRepository - リポジトリの詳細情報
 * @returns リポジトリの詳細情報
 */
function DetailCard(props: {
    avatar_url: string,
    name: string,
    language: string,
    stargazers_count: number,
    watchers_count: number,
    forks_count: number,
    open_issues_count: number,
}) {
    return (
        <Card padding="md" radius="md" withBorder>
            {/* ヘッダー部分: アイコン、名前、言語 */}
            <Group align="flex-start" mb="lg">
                <Avatar
                    src={props.avatar_url}
                    size={80}
                />
                <Box style={{ flex: 1 }}>
                    <Title
                        order={2}
                        mb={"5px"}
                        style={{ wordBreak: 'break-all' }}
                    >
                        {props.name}
                    </Title>
                    {props.language && (
                        <Badge color="blue" variant="light" mt="5px">
                            {props.language}
                        </Badge>
                    )}
                </Box>
            </Group>

            {/* 統計情報グリッド */}
            <SimpleGrid cols={{ base: 2, xs: 4 }} spacing="md">
                <StatsItem
                    icon={<IconStar size={20} color="orange" />}
                    label="Star数"
                    value={props.stargazers_count}
                />
                <StatsItem
                    icon={<IconEye size={20} color="var(--mantine-color-blue-6)" />}
                    label="Watcher数"
                    value={props.watchers_count}
                />
                <StatsItem
                    icon={<IconGitFork size={20} color="var(--mantine-color-gray-6)" />}
                    label="Fork数"
                    value={props.forks_count}
                />
                <StatsItem
                    icon={<IconAlertCircle size={20} color="var(--mantine-color-red-6)" />}
                    label="Issues数"
                    value={props.open_issues_count}
                />
            </SimpleGrid>
        </Card>
    )
}

/**
 * 統計情報をまとめるコンポーネント
 * @param icon React.ReactNode - アイコン
 * @param label string - ラベル
 * @param value number - 各種カウント
 * @returns 
 */
function StatsItem(props: { icon: React.ReactNode, label: string, value: number }) {
    return (
        <Paper withBorder p="xs" radius="md" ta="center">
            <Group justify="center" gap={2} mb={2}>
                {props.icon}
            </Group>
            <Text size="xs" c="dimmed" fw={700}>
                {props.label}
            </Text>
            <Text fw={700} size="lg">
                {props.value.toLocaleString()}
            </Text>
        </Paper>
    );
}