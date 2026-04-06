import "@testing-library/jest-dom";
import { render, screen, } from "@/utils/tests/render";
import ErrorCardContainer from "./errorCardContainer";

describe("ErrorCardContainer", () => {

    test("エラー画面が正常に表示されているか", async () => {
        const errorMessage = "テストエラーテストエラーテストエラー"
        render(
            <ErrorCardContainer
                errorMessage={errorMessage}
            />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("repository-detail-error-card"))
            .toBeInTheDocument()
        expect(screen.findByText(errorMessage))
    });

    test("componentで渡されたコンポーネントが表示されるか", async () => {
        const component = (
            <>
                <div data-testid="repository-detail-child-component"></div>
            </>
        )
        const componentMessage = "子コンポーネント"
        render(
            <ErrorCardContainer
                errorMessage={""}
                component={component}
            />
        );

        // 渡したコンポーネントが存在するか
        expect(screen.getByTestId("repository-detail-child-component"))
            .toBeInTheDocument()
        expect(screen.findByText(componentMessage))
    });
});