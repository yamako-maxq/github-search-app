import { Center, Loader } from "@mantine/core";

/**
 * ヘッダーを表示するコンテナコンポーネント
 * @param color string - theme.colors のキー、または有効な CSS カラー名
 */
export default function LoaderPresenter({ color }: { color: string }) {
    return (
        <Center data-testid="loader">
            <Loader color={color} />
        </Center>
    );
}