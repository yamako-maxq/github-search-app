import "@testing-library/jest-dom";
import { render } from "@/utils/tests/render";
import Container from "./headerContainer";
import Presenter from "./headerPresenter";

const headerTitle = "Github Search App";

// Presenterをモック化
jest.mock("./headerPresenter", () => {
    return jest.fn(() => <div data-testid="mock-presentation" />);
});

// TypeScriptの型エラーを防ぐためモック関数の型アサーション
const MockPresenter = Presenter as jest.Mock;

describe("headerContainer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const testProps =
    {
        title: headerTitle
    }

    test("タイトルが正しくレンダリングされているか", async () => {
        // Containerをレンダリング
        const renderContainer = await Container(testProps);
        render(renderContainer);

        // Presentationコンポーネントに正しいPropsが渡されたか
        expect.objectContaining(testProps)

        // 画面描画が行われているか
        expect(MockPresenter)
            .toHaveBeenCalled();
    });
});