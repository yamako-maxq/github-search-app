import { Center, Loader } from "@mantine/core";

export default function LoaderPresenter({ color }: { color: string }) {
    return (
        <Center>
            <Loader color={color} />
        </Center>
    );
}