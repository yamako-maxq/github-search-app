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
    Box
} from '@mantine/core';
import {
    IconStar,
    IconEye,
    IconGitFork,
    IconAlertCircle
} from '@tabler/icons-react';

interface DetailPresentationProps {
    detail: GitHubRepository;
}

export default function RepoDetailPresentation({ detail }: DetailPresentationProps) {
    return (
        <Container size="md" py="xl">
            <Stack gap="md">
                {detail ? (
                    <Card padding="md" radius="md" withBorder>
                        {/* ヘッダー部分: アイコン、名前、言語 */}
                        <Group align="flex-start" mb="lg">
                            <Avatar
                                src={detail.owner.avatar_url}
                                size={80}
                            />
                            <Box style={{ flex: 1 }}>
                                <Title order={2} mb={"5px"} style={{ wordBreak: 'break-all' }}>{detail.name}</Title>
                                {detail.language && (
                                    <Badge color="blue" variant="light" mt="5px">
                                        {detail.language}
                                    </Badge>
                                )}
                            </Box>
                        </Group>

                        {/* 統計情報グリッド */}
                        <SimpleGrid cols={{ base: 2, xs: 4 }} spacing="md">
                            <StatsItem
                                icon={<IconStar size={20} color="orange" />}
                                label="Star数"
                                value={detail.stargazers_count}
                            />
                            <StatsItem
                                icon={<IconEye size={20} color="var(--mantine-color-blue-6)" />}
                                label="Watcher数"
                                value={detail.watchers_count}
                            />
                            <StatsItem
                                icon={<IconGitFork size={20} color="var(--mantine-color-gray-6)" />}
                                label="Fork数"
                                value={detail.forks_count}
                            />
                            <StatsItem
                                icon={<IconAlertCircle size={20} color="var(--mantine-color-red-6)" />}
                                label="Issues数"
                                value={detail.open_issues_count}
                            />
                        </SimpleGrid>
                    </Card>
                ) : (
                    <></>
                )}
            </Stack>
        </Container>
    );
}
/**


 */
// 統計表示用のサブコンポーネント
function StatsItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
    return (
        <Paper withBorder p="xs" radius="md" ta="center">
            <Group justify="center" gap={2} mb={2}>
                {icon}
            </Group>
            <Text size="xs" c="dimmed" fw={700}>
                {label}
            </Text>
            <Text fw={700} size="lg">
                {value.toLocaleString()}
            </Text>
        </Paper>
    );
}