import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from '@/utils/tests/render';
import SearchPresentation, { SearchInput, SearchList, SearchPagination, SearchSkeleton } from "../searchPresenter";
import { repositoryMockResults } from "./mockData";

const QUERY = "yamako-maxq/github-search-app";

describe("SearchPresentation", () => {
    test("レンダリングされていること", () => {
        render(
            <SearchPresentation
                query={QUERY}
                loading={false}
                results={repositoryMockResults}
                activePage={1}
                totalPages={repositoryMockResults.length}
                error={null}
                onQueryChange={jest.fn()}
                onSearch={jest.fn()}
                onPageChange={jest.fn()}
            />
        );
    });

    test("onKeyDown イベントが正しく処理されること", () => {
        const onSearchMock = jest.fn();
        render(
            <SearchPresentation
                query={QUERY}
                loading={false}
                results={repositoryMockResults}
                activePage={1}
                totalPages={repositoryMockResults.length}
                error={null}
                onQueryChange={jest.fn()}
                onSearch={onSearchMock}
                onPageChange={jest.fn()}
            />
        );
        const input = screen.getByLabelText("search-input");
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        // onSearchが呼び出されることを確認
        expect(onSearchMock).toHaveBeenCalledTimes(1);

    });

    test("ページネーションが正しく表示されること", () => {
        const onPageChangeMock = jest.fn();
        render(
            <SearchPresentation
                query={QUERY}
                loading={false}
                results={repositoryMockResults}
                activePage={1}
                totalPages={repositoryMockResults.length}
                error={null}
                onQueryChange={jest.fn()}
                onSearch={jest.fn()}
                onPageChange={onPageChangeMock}
            />
        );
        const paginationButton = screen.getByRole("button", { name: /2/ });
        fireEvent.click(paginationButton);
        expect(onPageChangeMock).toHaveBeenCalledTimes(1);

    });

    test("ローディング時にスケルトンUIがレンダリングされること", () => {
        render(
            <SearchPresentation
                query={QUERY}
                loading={true}
                results={[]}
                activePage={1}
                totalPages={repositoryMockResults.length}
                error={null}
                onQueryChange={jest.fn()}
                onSearch={jest.fn()}
                onPageChange={jest.fn()}
            />
        );
    });

    test("エラーが表示されること", () => {
        render(
            <SearchPresentation
                query={QUERY}
                loading={false}
                results={[]}
                activePage={1}
                totalPages={repositoryMockResults.length}
                error={"エラーが発生しました"}
                onQueryChange={jest.fn()}
                onSearch={jest.fn()}
                onPageChange={jest.fn()}
            />
        );
    });

    test("検索結果が返された時、結果が表示されること", () => {
        render(
            <SearchPresentation
                query={QUERY}
                loading={false}
                results={repositoryMockResults}
                activePage={1}
                totalPages={repositoryMockResults.length}
                error={null}
                onQueryChange={jest.fn()}
                onSearch={jest.fn()}
                onPageChange={jest.fn()}
            />
        );
    });

});