import HeaderPresenter from "./headerPresenter";

export default function HeaderContainer({ title }: { title: string }) {
    return <HeaderPresenter title={title} />;
}