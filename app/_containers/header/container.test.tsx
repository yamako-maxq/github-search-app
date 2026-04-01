import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import HeaderPresentation from './presentational';

// MantineProviderでラップ
const renderWithProvider = (ui: React.ReactNode) => {
    return render(
        <MantineProvider>
            {ui}
        </MantineProvider>
    );
};

describe('headerPresentation', () => {
    it('渡されたタイトルが正しくレンダリングされること', () => {
        const title = "Github Search App";
        renderWithProvider(<HeaderPresentation title={title} />);

        // titleの内容が画面内に存在するか
        const headerElement = screen.getByText(title);
        expect(headerElement).toBeInTheDocument();
    });

    it('headerタグが適切なクラスを持っていること', () => {
        const { container } = renderWithProvider(<HeaderPresentation title="Test" />);

        // header要素を取得（querySelectorまたはroleで取得）
        const headerTag = container.querySelector('header');

        // headerタグが存在するか
        expect(headerTag).toBeInTheDocument();

        // CSS Modulesのクラスが適用されているか
        expect(headerTag).toHaveClass('header');
    });
});