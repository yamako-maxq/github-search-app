// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import HeaderContainer from '@/components/header';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata = {
  title: 'Github Search App',
  description: 'GitHubのリポジトリーを検索するwebアプリケーションです',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider>
          <HeaderContainer title="Github Search App" />
          <NuqsAdapter>{children}</NuqsAdapter>
        </MantineProvider>
      </body>
    </html>
  );
}