import LoaderPresenter from "./loaderPresenter";

export default function LoaderContainer({ color = "blue" }: { color?: string }) {
    return <LoaderPresenter color={color} />;
}