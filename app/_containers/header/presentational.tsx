import { Group, Text } from '@mantine/core';
import classes from './header.module.css';

type HeaderProps = {
    title: string;
};

export default function HeaderPresentation({ title }: HeaderProps) {
    return (
        <header className={classes.header}>
            <Group h="100%" px="md">
                <Text size="lg" fw={700}>
                    {title}
                </Text>
            </Group>
        </header>
    );
}