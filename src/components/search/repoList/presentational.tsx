"use client";
import { Grid, Text } from '@mantine/core';

export default function RepoListPresentation() {
    return (
        <Grid w="100%">
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Text>Repo List Card</Text>
            </Grid.Col>
        </Grid>
    );
}