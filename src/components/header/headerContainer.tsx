import HeaderPresenter from "./headerPresenter";

/**
 * ヘッダーを表示するコンテナコンポーネント
 * @param title string - タイトル
 */
export default function HeaderContainer({ title }: { title: string }) {
    return <HeaderPresenter title={title} />;
}