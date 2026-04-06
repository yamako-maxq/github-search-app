import "@testing-library/jest-dom";
import { render, screen, } from "@/utils/tests/render";
import LoaderContainer from "./loaderContainer";

describe("LoaderPresenter", () => {

    test("ローディングが表示されているか", async () => {
        render(
            <LoaderContainer color="blue" />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("loader"))
            .toBeInTheDocument()
    });

    test("色の情報を渡さなくてもローディングが表示されているか", async () => {
        render(
            <LoaderContainer />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("loader"))
            .toBeInTheDocument()
    });
});