import "@mantine/core/styles.css";
import HeaderContainer from "@/components/header";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderContainer title="Github Search App" />
      <NuqsAdapter>
        {children}
      </NuqsAdapter>
    </>
  );
}