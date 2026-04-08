import LoaderPresenter from "./loaderPresenter";

/**
 * ヘッダーを表示するプレゼンテーションコンポーネント
 * @param color string - theme.colors のキー、または有効な CSS カラー名
 */
export default function LoaderContainer({ color = "blue" }: { color?: string }) {
    return <LoaderPresenter color={color} />;
}