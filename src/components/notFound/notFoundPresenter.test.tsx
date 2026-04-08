import "@testing-library/jest-dom";
import { render, screen } from "@/utils/tests/render";
import Presenter from "./notFoundPresenter";

describe("NotFoundPresenter", () => {
    test("画面が正常に表示できているか", async () => {
        render(
            <Presenter />
        );

        expect(screen.getByTestId("not-found-container"))
            .toBeInTheDocument()
    });

    test("戻るボタンが存在するか", async () => {
        render(
            <Presenter />
        );

        expect(screen.getByTestId("not-found-button"))
            .toBeInTheDocument()
    });
});