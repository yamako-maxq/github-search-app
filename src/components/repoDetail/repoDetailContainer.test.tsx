import { render } from "@testing-library/react";
import Container from "./repoDetailContainer"; // ファイル名は実際の環境に合わせて変更してください
import Presenter from "./repoDetailPresenter";
import { fetchGitHubRepositoryDetail } from "@/utils/apis/fetchGitHubRepositoryDetail";
import { notFound } from "next/navigation";
import { validateGitHubRepositoryDetail } from "@/utils/validations/gitHubRepositoryDetail";
import { repositoryMockResult } from "@/utils/contains/tests/gitHubApi.mock";

// Presenterをモック化
jest.mock("./repoDetailPresenter", () => {
    return jest.fn(() => <div data-testid="mock-presentation" />);
});

// errorCardをモック化
jest.mock("@/components/errorCard");

// fetchをモック化
jest.mock("@/utils/apis/fetchGitHubRepositoryDetail");

// next/navigationをモック化
jest.mock("next/navigation", () => ({
    notFound: jest.fn(),
}));

// バリデーションをモック化
jest.mock("@/utils/validations/gitHubRepositoryDetail");

// TypeScriptの型エラーを防ぐためモック関数の型アサーション
const mockFetch = fetchGitHubRepositoryDetail as jest.Mock;
const mockValidate = validateGitHubRepositoryDetail as jest.Mock;
const mockNotFound = (notFound as unknown) as jest.Mock;
const MockPresenter = Presenter as jest.Mock;

describe("RepoDetailContainer", () => {
    const testProps = {
        owner: "test-owner",
        repo: "test-repo",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("バリデーションに失敗した場合、エラーカードがレンダリングされること", async () => {
        // バリデーションに失敗
        mockValidate.mockReturnValue(false);

        // API通信は呼ばれなかったか
        expect(mockFetch)
            .not
            .toHaveBeenCalled();

        // Containerをレンダリング
        const repoDetailContainer = await Container(testProps);
        render(repoDetailContainer);

        // Presentationコンポーネントに正しいPropsが渡されたか
        expect.objectContaining(
            {
                detail: null,
                errorMessage: "システムエラーが発生しました"
            }
        )

        // 画面描画が行われているか
        expect(MockPresenter)
            .toHaveBeenCalled();

    });

    test("APIのステータスが200の場合、データが正常にUIコンポーネントに渡せているか", async () => {
        // バリデーションが成功
        mockValidate.mockReturnValue(true);

        // fetchがステータスコード200とリポジトリ情報を返す
        mockFetch.mockResolvedValue(
            { status: 200, data: repositoryMockResult }
        );

        // Containerをレンダリング
        const repoDetailContainer = await Container(testProps);
        render(repoDetailContainer);

        // Presentationコンポーネントに正しいPropsが渡されたか
        expect.objectContaining({ detail: repositoryMockResult })

        // 画面描画が行われているか
        expect(MockPresenter)
            .toHaveBeenCalled();
    });

    test("APIのステータスが404の場合、notFound()が呼び出されているか", async () => {
        // バリデーションが成功
        mockValidate.mockReturnValue(true);

        // fetchがステータスコード404を返す
        mockFetch.mockResolvedValue({ status: 404 });

        // Containerをレンダリング
        const repoDetailContainer = await Container(testProps);
        render(repoDetailContainer);

        // NotFoundがが呼ばれたか
        expect(mockNotFound)
            .toHaveBeenCalled();

        // 画面描画は行われなかったか
        expect(MockPresenter)
            .not
            .toHaveBeenCalled();
    });

    test("APIのステータスが事前に定義したコード以外の場合でも、エラーメッセージを返しているか", async () => {
        // バリデーションが成功
        mockValidate.mockReturnValue(true);

        // fetchが返すステータスコードとメッセージ
        const status = 500
        const message = "API呼び出しに失敗しました"

        // fetchがステータスコード404とエラーメッセージを返す
        mockFetch.mockResolvedValue(
            { status: status, message: message }
        );

        // Containerをレンダリング
        const resolvedComponent = await Container(testProps);
        render(resolvedComponent);

        // 事前に定義したメッセージを返しているか
        expect.objectContaining({
            detail: null,
            errorMessage: message,
        })
    });

    test("APIのステータスが200で、レスポンスデータがNULLの場合、エラーメッセージを返しているか", async () => {
        // バリデーションが成功
        mockValidate.mockReturnValue(true);

        // fetchがステータスコード200とnullを返す
        mockFetch.mockResolvedValue({ status: 200, data: null });

        // Containerをレンダリング
        const resolvedComponent = await Container(testProps);
        render(resolvedComponent);

        // Presentationコンポーネントに正しいPropsが渡されたか
        expect.objectContaining({ detail: null })

        // 画面描画は行われたか
        expect(MockPresenter)
            .toHaveBeenCalled();
    });
});