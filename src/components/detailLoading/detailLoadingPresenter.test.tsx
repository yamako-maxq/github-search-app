import "@testing-library/jest-dom";
import { render, screen, } from "@/utils/tests/render";
import Presenter from "./detailLoadingPresenter";

describe("DetailLoadingContainer", () => {

    test("スケルトンが正常に表示できているか", async () => {
        render(
            <Presenter />
        );

        // 詳細が表示されているか
        expect(screen.getByTestId("detail-loading-card"))
            .toBeInTheDocument()

    });
});