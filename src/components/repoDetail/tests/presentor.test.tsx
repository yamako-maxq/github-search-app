import "@testing-library/jest-dom";
import { render, screen, } from '@/utils/tests/render';
import RepoDetailPresentation, { DetailCard, ErrorCard, StatsItem } from "../repoDetailPresenter";
import { repositoryMockResult } from "./mockData"
import { IconStar } from '@tabler/icons-react';

describe("RepoDetailPresentation", () => {
    test("詳細情報が正常に表示できているか", async () => {
        render(
            <RepoDetailPresentation
                detail={repositoryMockResult}
            />
        );
        // 詳細が表示されているか
        expect(screen.getByTestId("repository-detail-card"))
            .toBeInTheDocument()

        // エラー画面が出ていないか
        expect(screen.queryByTestId("repository-detail-error-card"))
            .not
            .toBeInTheDocument()

    });

    test("エラーメッセージが正常に表示できているか", () => {
        render(
            <RepoDetailPresentation
                detail={null}
                errorMessage="エラーが発生しました"
            />
        );
        // エラー画面がでているか
        expect(screen.getByTestId("repository-detail-error-card"))
            .toBeInTheDocument()

        // 詳細画面が出ていないか
        expect(screen.queryByTestId("repository-detail-card"))
            .not
            .toBeInTheDocument()
    });

    test("デフォルトのエラーメッセージが表示できるか", () => {
        render(
            <RepoDetailPresentation
                detail={null}
            />
        );
        // エラー画面がでているか
        expect(screen.getByTestId("repository-detail-error-card"))
            .toBeInTheDocument()

        // 詳細画面が出ていないか
        expect(screen.queryByTestId("repository-detail-card"))
            .not
            .toBeInTheDocument()
    });
});

describe("DetailCard", () => {
    beforeEach(() => {
        render(
            <DetailCard
                avatar_url={repositoryMockResult.owner.avatar_url}
                name={repositoryMockResult.name}
                language={repositoryMockResult.language}
                stargazers_count={repositoryMockResult.stargazers_count}
                watchers_count={repositoryMockResult.watchers_count}
                forks_count={repositoryMockResult.forks_count}
                open_issues_count={repositoryMockResult.open_issues_count}
            />
        );
    });

    test("コンポーネントが正しく表示されているか", () => {
        // Cardコンポーネント
        expect(screen.getByTestId("repository-detail-card"))
            .toBeInTheDocument()

        // リポジトリ名
        expect(screen.getByTestId("repository-name"))
            .toBeInTheDocument()

        // プロフィール画像
        expect(screen.getByTestId("repository-avatar-url"))
            .toBeInTheDocument()

        // IconStarアイコン
        expect(screen.getByTestId("star-icon"))
            .toBeInTheDocument()

        // IconEyeアイコン
        expect(screen.getByTestId("eye-icon"))
            .toBeInTheDocument()

        // IconGitForkアイコン
        expect(screen.getByTestId("git-fork-icon"))
            .toBeInTheDocument()

        // IconAlertCircleアイコン
        expect(screen.getByTestId("star-icon"))
            .toBeInTheDocument()
    });

    test("与えたパラメーターが正しく表示されているか", () => {
        // リポジトリ名
        expect(screen.getByText(repositoryMockResult.name))
            .toBeInTheDocument();

        // 言語情報
        expect(screen.getByText(repositoryMockResult.language))
            .toBeInTheDocument();
    });
});

describe("StatsItem", () => {
    const label = "Star数"
    const value = 2000

    beforeEach(() => {
        render(
            <StatsItem
                icon={<IconStar
                    size={20}
                    color="orange"
                    aria-label="star icon"
                    data-testid="star-icon"
                />}
                label={label}
                value={value}
            />
        );
    });
    test("コンポーネントが正しく表示されているか", () => {
        // Paperコンポーネント
        expect(screen.getByTestId("repository-stats-paper"))
            .toBeInTheDocument()

        // アイコンをラップしているGroupコンポーネント
        expect(screen.getByTestId("repository-stats-item-icon"))
            .toBeInTheDocument()

        // labelのTextコンポーネント
        expect(screen.getByTestId("repository-stats-item-label-text"))
            .toBeInTheDocument()

        // valueのTextコンポーネント
        expect(screen.getByTestId("repository-stats-item-value-text"))
            .toBeInTheDocument()

    });

    test("与えたパラメーターが正しく表示されているか", () => {
        // ラベル
        expect(screen.getByText(label))
            .toBeInTheDocument();

        // スター数
        expect(screen.getByText(value.toLocaleString()))
            .toBeInTheDocument();
    });
});

describe("ErrorCard", () => {
    test("エラーメッセージの文字列が正しいか", () => {
        const errorMessage = "エラーが発生しました"
        render(
            <ErrorCard
                errorMessage={errorMessage}
            />
        );
        expect(screen.getByText(errorMessage))
            .toBeInTheDocument();
    });

    test("エラーメッセージがNULLの場合はデフォルトの文字列が表示されるか", () => {
        const errorMessage = "予期せぬエラーが発生しました"
        render(
            <ErrorCard />
        );
        expect(screen.getByText(errorMessage))
            .toBeInTheDocument();
    });
});