import "@testing-library/jest-dom";
import MantineRenderProvider from "@/components/test/mantineRenderProvider";
import { screen } from "@testing-library/react";
import HeaderContainer from "../headerContainer";

const headerTitle = "Github Search App";

describe("HeaderContainer", () => {
    it("タイトルが正しくレンダリングされること", () => {
        MantineRenderProvider(<HeaderContainer title={headerTitle} />);

        // Presentationalが正しくタイトルを表示しているか
        expect(screen.getByText(headerTitle)).toBeInTheDocument();
    });
});