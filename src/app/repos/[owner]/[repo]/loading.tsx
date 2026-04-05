import {
    Container,
    Stack,
    Card,
    Group,
    Box,
    Skeleton,
    SimpleGrid,
    Paper
} from "@mantine/core";

export default function DetailLoading() {
    return (
        <Container size="md" py="xl">
            <Stack gap="md">
                <Card padding="md" radius="md" withBorder>
                    {/* ヘッダー部分: アイコン、名前、言語のスケルトン */}
                    <Group align="flex-start" mb="lg">
                        {/* Avatarのスケルトン */}
                        <Skeleton height={80} width={80} circle radius="xl" />

                        <Box style={{ flex: 1 }}>
                            {/* Titleのスケルトン */}
                            <Skeleton height={42} width={"70%"} mb="5px" />
                            {/* Badgeのスケルトン */}
                            <Skeleton height={22} width={100} mt="5px" radius="xl" />
                        </Box>
                    </Group>

                    {/* 統計情報グリッドのスケルトン */}
                    <SimpleGrid cols={{ base: 2, xs: 4 }} spacing="md">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Paper key={index} withBorder p="xs" radius="md" ta="center">
                                {/* アイコン部分 */}
                                <Group justify="center" gap={2} mb={8}>
                                    <Skeleton height={18} width={20} circle />
                                </Group>
                                {/* ラベル (Star数など) */}
                                <Group justify="center" mb={8}>
                                    <Skeleton height={12} width={50} />
                                </Group>
                                {/* 数値 */}
                                <Group justify="center">
                                    <Skeleton height={22} width={40} />
                                </Group>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Card>
            </Stack>
        </Container>
    );
}