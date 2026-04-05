import DetailContainer from "@/components/repoDetail/repoDetailContainer";

// パスパラメータの型を定義
type DetailPageProps = {
  params: Promise<{
    owner: string
    repo: string
  }>;
}

export default async function Detail({ params }: DetailPageProps) {
  const { owner, repo } = await params;
  return <DetailContainer owner={owner} repo={repo} />;
}
