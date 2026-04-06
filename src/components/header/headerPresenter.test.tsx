import "@testing-library/jest-dom";
import MantineRenderProvider from "@/components/test/mantineRenderProvider";
import { screen } from "@testing-library/react";
import HeaderPresenter from "./headerPresenter";

// ヘッダーのタイトル
const headerTitle = "Github Search App";

describe("headerPresenter", () => {
    test("渡されたタイトルが正しくレンダリングされること", () => {
        MantineRenderProvider(<HeaderPresenter title={headerTitle} />);

        // headerTitleの内容が画面内に存在するか
        const headerElement = screen.getByText(headerTitle);
        expect(headerElement).toBeInTheDocument();
    });

    test("headerタグが適切なクラスを持っていること", () => {
        const { container } = MantineRenderProvider(<HeaderPresenter title={headerTitle} />);

        // header要素を取得（querySelectorまたはroleで取得）
        const headerTag = container.querySelector("header");

        // headerタグが存在するか
        expect(headerTag).toBeInTheDocument();

        // CSS Modulesのクラスが適用されているか
        expect(headerTag).toHaveClass("header");
    });
});