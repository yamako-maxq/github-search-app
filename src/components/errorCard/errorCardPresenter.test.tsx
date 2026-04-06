import "@testing-library/jest-dom";
import { render, screen, } from "@/utils/tests/render";
import ErrorCardPresenter from "./errorCardPresenter";

describe("ErrorCardPresenter", () => {

    test("エラー画面が正常に表示されているか", async () => {
        const errorMessage = "テストエラーテストエラーテストエラー"
        render(
            <ErrorCardPresenter
                errorMessage={errorMessage}
            />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("repository-detail-error-card"))
            .toBeInTheDocument()
        expect(screen.findByText(errorMessage))
    });
});