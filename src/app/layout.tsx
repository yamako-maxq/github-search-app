import { Metadata } from "next";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";

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
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}