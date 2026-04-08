import { Button, Container, Group, Title } from "@mantine/core";
import classes from "./notFound.module.css";

/**
 * 404ページを表示するプレゼンテーションコンポーネント
 */
export default function NotFoundPresenter() {
    return (
        <Container className={classes.root} data-testid="not-found-container">
            <div className={classes.label}>404</div>
            <Title className={classes.title}>お探しのページが見つかりませんでした。</Title>
            <Group justify="center" className={classes.backHome}>
                <Button component={"a"} href={"/"} variant="subtle" size="md" data-testid="not-found-button">
                    トップ画面へ戻る
                </Button>
            </Group>
        </Container>
    );
}