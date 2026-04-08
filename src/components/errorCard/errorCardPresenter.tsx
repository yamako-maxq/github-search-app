import {
    Card,
    Text,
    Group,
    Title,
    Box
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

/**
 * エラーメッセージを表示するプレゼンテーションコンポーネント
 * @param errorMessage string - エラーメッセージ
 */
export default function ErrorCardPresenter({ errorMessage, component }: { errorMessage: string, component?: React.ReactNode }) {
    return (
        <Card padding="md" radius="md" data-testid="repository-detail-error-card" withBorder>
            <Group align="center" mb="lg">
                <IconAlertCircle size={40} color="var(--mantine-color-red-6)" />
                <Box style={{ flex: 1 }}>
                    <Title order={3} mb={"5px"}>エラー</Title>
                    <Text c="dimmed" data-testid="repository-detail-error-text">
                        {errorMessage}
                    </Text>
                </Box>
            </Group>
            {component}
        </Card>
    )
}