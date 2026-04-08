import RepoDetailPresentation from "./repoDetailPresenter";
import { fetchGitHubRepositoryDetail } from "@/utils/apis/fetchGitHubRepositoryDetail";
import { notFound } from "next/navigation"
import { GitHubRepository } from "@/types/github";
import { validateGitHubRepositoryDetail } from "@/utils/validations/gitHubRepositoryDetail";

type DetailPageProps = {
    owner: string;
    repo: string;
}

/** 
 * リポジトリの詳細を表示するコンテナコンポーネント
 * @param owner string - リポジトリのユーザー名
 * @param repo string - リポジトリ名
 */
export default async function RepoDetailContainer({ owner, repo }: DetailPageProps) {
    // パラメーターのバリデーション
    if (!validateGitHubRepositoryDetail(owner, repo)) {
        return <RepoDetailPresentation
            detail={null}
            errorMessage={"システムエラーが発生しました"}
        />;
    }

    // URLパラメータからリポジトリの詳細情報を取得
    const response = await fetchGitHubRepositoryDetail(
        owner,
        repo,
        {
            token: process.env.GITHUB_TOKEN
        }
    );

    // レスポンスに応じて処理を変える
    if (response.status === 200) {
        const detail: GitHubRepository | null = response.data ? response.data as GitHubRepository : null;
        return <RepoDetailPresentation detail={detail} />;
    } else if (response.status === 404) {
        // リポジトリが見つからない場合は404ページを表示
        notFound();
    } else {
        return <RepoDetailPresentation
            detail={null}
            errorMessage={response.message}
        />;
    }
}