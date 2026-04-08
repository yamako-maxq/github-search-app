import ErrorCardPresenter from "./errorCardPresenter";

/**
 * エラメッセージを表示するコンテナコンポーネント
 * @param  errorMessage string - エラーメッセージ
 */
export default function ErrorCardContainer({ errorMessage, component }: { errorMessage: string, component?: React.ReactNode }) {
    return <ErrorCardPresenter errorMessage={errorMessage} component={component} />
}