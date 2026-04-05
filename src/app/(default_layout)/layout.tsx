// Import styles of packages that you"ve installed.
// All packages except `@mantine/hooks` require styles imports
import { Metadata } from "next";
import "@mantine/core/styles.css";
import HeaderContainer from "@/components/header";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Github Search App",
  description: "GitHubのリポジトリーを検索するwebアプリケーションです",
  robots: {
    index: false,
    follow: false,
    nosnippet: true,
    googleBot: {
      index: false,
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderContainer title="Github Search App" />
      <NuqsAdapter>{children}</NuqsAdapter>
    </>
  );
}