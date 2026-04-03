import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@/utils/tests/render';
import SearchPresenter, { SearchInput, SearchList, SearchSkeleton } from "../searchPresenter";
import { repositoryMockResults, repositoryMockResult } from "./mockData";

const QUERY = "yamako-maxq/github-search-app";

/**
 * SearchPresenterコンポーネントのテスト
 */
describe("SearchInput", () => {
    test("クエリが変更されること", () => {
        const onQueryChangeMock = jest.fn();
        render(
            <SearchInput
                query={QUERY}
                onQueryChange={onQueryChangeMock}
                onSearch={jest.fn()}
                loading={false}
            />
        );
        const input = screen.getByLabelText("search-input");
        fireEvent.change(input, { target: { value: "new query" } });
        expect(onQueryChangeMock).toHaveBeenCalledWith("new query");
    });

    test("Enterキーで検索が実行されること", () => {
        const onSearchMock = jest.fn();
        render(
            <SearchInput
                query={QUERY}
                onQueryChange={jest.fn()}
                onSearch={onSearchMock}
                loading={false}
            />
        );
        const input = screen.getByLabelText("search-input");
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(onSearchMock).toHaveBeenCalledTimes(1);
    });

    test("検索ボタンがクリックされること", () => {
        const onSearchMock = jest.fn();
        render(
            <SearchInput
                query={QUERY}
                onQueryChange={jest.fn()}
                onSearch={onSearchMock}
                loading={false}
            />
        );
        const button = screen.getByRole("button", { name: /検索/ });
        fireEvent.click(button);
        expect(onSearchMock).toHaveBeenCalledTimes(1);
    });
});

/**
 * SearchListコンポーネントのテスト
 */
describe("SearchList", () => {
    test("検索結果が正しく表示されること", () => {
        render(
            <SearchList
                results={
                    [
                        { ...repositoryMockResult, id: 1, name: "repo1" },
                        { ...repositoryMockResult, id: 2, name: "repo2" },
                        { ...repositoryMockResult, id: 3, name: "repo3" },
                    ]
                }
            />
        );
        // nameには、リンクの中にあるテキスト（repo.name）を指定します
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(3);
        expect(links[0]).toHaveTextContent("repo1");
        expect(links[1]).toHaveTextContent("repo2");
        expect(links[2]).toHaveTextContent("repo3");
    });
});

/**
 * SearchListコンポーネントのテスト
 */
describe("SearchSkeleton", () => {
    test("ローディング時にスケルトンが表示されること", () => {
        render(
            <SearchSkeleton count={3} />
        );
        const skeleton = screen.getByLabelText("search-skeleton");
        expect(skeleton).toBeInTheDocument();
    });
});

/**
 * SearchPresenterコンポーネントのテスト
 */
describe("SearchPresenter", () => {
    test("レンダリングされていること", () => {
        render(
            <SearchPresenter
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
        // クエリが表示されていることを確認
        const input = screen.getByLabelText("search-input");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(QUERY);
    });

    test("ローディング時にスケルトンが表示されること", () => {
        render(
            <SearchPresenter
                query={QUERY}
                loading={true}
                results={repositoryMockResults}
                activePage={1}
                totalPages={repositoryMockResults.length}
                error={null}
                onQueryChange={jest.fn()}
                onSearch={jest.fn()}
                onPageChange={jest.fn()}
            />
        );
        const skeleton = screen.getByLabelText("search-skeleton");
        expect(skeleton).toBeInTheDocument();
    });

    test("onKeyDown イベントが正しく処理されること", () => {
        const onSearchMock = jest.fn();
        render(
            <SearchPresenter
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

    test("エラーが表示されること", () => {
        render(
            <SearchPresenter
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
        const errorMessage = screen.getByText("エラーが発生しました");
        expect(errorMessage).toBeInTheDocument();
    });
});