import { Center, Loader } from "@mantine/core";

export default function LoaderPresenter({ color }: { color: string }) {
    return (
        <Center data-testid="loader">
            <Loader color={color} />
        </Center>
    );
}