import { Suspense } from 'react';
import GitHubReposContainer from "@/components/search";
import Loader from "@/components/loader"

export default function Search() {
  return (
    <Suspense fallback={<Loader />}>
      <GitHubReposContainer />
    </Suspense>
  );
}
