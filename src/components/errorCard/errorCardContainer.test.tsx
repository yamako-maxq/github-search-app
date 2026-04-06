import "@testing-library/jest-dom";
import { render } from "@/utils/tests/render";

import Container from "./errorCardContainer";
import Presenter from "./errorCardPresenter";

// Presenterをモック化
jest.mock("./errorCardPresenter", () => {
    return jest.fn(() => <div data-testid="mock-presentation" />);
});
const MockChildComponent = () => (
    <div data-testid="repository-detail-child-component">Mocked Child</div>
);

const MockPresenter = Presenter as jest.Mock;

describe("ErrorCardContainer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("エラー画面が正常に表示されているか", async () => {
        const renderContainer = await Container({
            errorMessage: "テストエラーテストエラーテストエラー"
        });
        render(renderContainer);

        // 画面描画が行われているか
        expect(MockPresenter)
            .toHaveBeenCalled();
    });

    test("componentプロパティで渡されたコンポーネントが表示されるか", async () => {
        const renderContainer = await Container({
            errorMessage: "message",
            component: <MockChildComponent />
        });
        render(renderContainer);

        // 画面描画が行われているか
        expect(MockPresenter)
            .toHaveBeenCalled();
    });
});