import { Button, Container, Group, Title } from '@mantine/core';
import classes from './styles/notFound.module.css';
import Link from 'next/link';

export default function NotFoundPresenter() {
    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title className={classes.title}>お探しのページが見つかりませんでした。</Title>
            <Group justify="center" className={classes.backHome}>
                <Link href={"/"}>
                    <Button component="a" variant="subtle" size="md">
                        トップ画面へ戻る
                    </Button>
                </Link>
            </Group>
        </Container>
    );
}