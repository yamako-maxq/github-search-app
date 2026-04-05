import { Group, Text } from "@mantine/core";
import classes from "./header.module.css";
import Link from "next/link";

type HeaderProps = {
    title: string;
};

export default function HeaderPresenter({ title }: HeaderProps) {
    return (
        <header className={classes.header}>
            <Group h="100%" px="md">
                <Link href="/search/repositories" className={classes.title}>
                    <Text size="lg" fw={700}>
                        {title}
                    </Text>
                </Link>
            </Group>
        </header>
    );
}