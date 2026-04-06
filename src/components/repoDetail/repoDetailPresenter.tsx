import { GitHubRepository } from "@/types/github";
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
    Center,
    Button
} from "@mantine/core";
import {
    IconStar,
    IconEye,
    IconGitFork,
    IconAlertCircle
} from "@tabler/icons-react";

import ErrorCardContainer from "@/components/errorCard";

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
                    <Center style={{ height: "50vh" }}>
                        <ErrorCardContainer
                            errorMessage={errorMessage || "リポジトリの詳細情報を取得できませんでした。"}
                            component={(
                                <Button w={"100%"} component="a" href="/" variant="outline" mt="md">
                                    戻る
                                </Button>
                            )}
                        />
                    </Center>
                )}
            </Stack>
        </Container>
    );
}
/**
 * リポジトリの詳細情報を表示するコンポーネント
 * @param detail GitHubRepository - リポジトリの詳細情報
 * @returns リポジトリの詳細情報
 */
export function DetailCard(props: {
    avatar_url: string,
    name: string,
    language: string,
    stargazers_count: number,
    watchers_count: number,
    forks_count: number,
    open_issues_count: number,
}) {
    return (
        <Card padding="md" radius="md" withBorder data-testid="repository-detail-card">
            {/* ヘッダー部分: アイコン、名前、言語 */}
            <Group align="flex-start" mb="lg">
                <Avatar
                    src={props.avatar_url}
                    size={80}
                    aria-label="avatar url"
                    data-testid="repository-avatar-url"
                />
                <Box style={{ flex: 1 }}>
                    <Title
                        order={2}
                        mb={"5px"}
                        style={{ wordBreak: "break-all" }}
                        aria-label="repository name"
                        data-testid="repository-name"
                    >
                        {props.name}
                    </Title>
                    {props.language && (
                        <Badge
                            color="blue"
                            variant="light"
                            mt="5px"
                            aria-label="language"
                            data-testid="repository-language"
                        >
                            {props.language}
                        </Badge>
                    )}
                </Box>
            </Group>

            {/* 統計情報グリッド */}
            <SimpleGrid cols={{ base: 2, xs: 4 }} spacing="md">
                <StatsItem
                    icon={<IconStar
                        size={20}
                        color="orange"
                        aria-label="star icon"
                        data-testid="star-icon"
                    />}
                    label="Star数"
                    value={props.stargazers_count}
                />
                <StatsItem
                    icon={<IconEye
                        size={20}
                        color="var(--mantine-color-blue-6)"
                        aria-label="eye icon"
                        data-testid="eye-icon"
                    />}
                    label="Watcher数"
                    value={props.watchers_count}
                />
                <StatsItem
                    icon={<IconGitFork
                        size={20}
                        color="var(--mantine-color-gray-6)"
                        aria-label="git fork icon" data-testid="git-fork-icon"
                    />}
                    label="Fork数"
                    value={props.forks_count}
                />
                <StatsItem
                    icon={<IconAlertCircle
                        size={20}
                        color="var(--mantine-color-red-6)"
                        aria-label="alert circle icon"
                        data-testid="alert-circle-icon"
                    />}
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
export function StatsItem(props: {
    icon: React.ReactNode,
    label: string,
    value: number,
    dataTestId?: string
}) {
    return (
        <Paper
            withBorder
            p="xs"
            radius="md"
            ta="center"
            data-testid="repository-stats-paper"
        >
            <Group
                justify="center"
                gap={2}
                mb={2}
                data-testid="repository-stats-item-icon"
            >
                {props.icon}
            </Group>
            <Text
                size="xs"
                c="dimmed"
                fw={700}
                data-testid="repository-stats-item-label-text"
            >
                {props.label}
            </Text>
            <Text
                fw={700}
                size="lg"
                data-testid="repository-stats-item-value-text"
            >
                {props.value.toLocaleString()}
            </Text>
        </Paper >
    );
}
