import "@testing-library/jest-dom";
import { render, screen, } from "@/utils/tests/render";
import Container from "./loaderContainer";

describe("LoaderPresenter", () => {

    test("ローディングが表示されているか", async () => {
        render(
            <Container color="blue" />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("loader"))
            .toBeInTheDocument()
    });

    test("色の情報を渡さなくてもローディングが表示されているか", async () => {
        render(
            <Container />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("loader"))
            .toBeInTheDocument()
    });
});