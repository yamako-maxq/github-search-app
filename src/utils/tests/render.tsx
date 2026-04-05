
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
export { userEvent };

/**
 * MantineをJestでテストするためのレンダリングコンポーネント
 * @param ui React.ReactNode - Reactのレンダリングコンポーネント
 * @returns JSX.Element
 */
export function render(ui: React.ReactNode) {
    return testingLibraryRender(<>{ui}</>, {
        wrapper: ({ children }: { children: React.ReactNode }) => (
            <MantineProvider env="test">{children}</MantineProvider>
        ),
    });
}