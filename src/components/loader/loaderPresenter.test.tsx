import "@testing-library/jest-dom";
import { render, screen, } from "@/utils/tests/render";
import LoaderPresenter from "./loaderPresenter";

describe("LoaderPresenter", () => {

    test("ローディングが表示されているか", async () => {
        render(
            <LoaderPresenter color="blue" />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("loader"))
            .toBeInTheDocument()
    });
});