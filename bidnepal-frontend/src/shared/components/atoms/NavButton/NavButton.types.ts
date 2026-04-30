export type NavButtonProps = {
    children: React.ReactNode;
    to: string;
    activeClass?: string;
    inActiveClass?: string;
    style?: string;
    onClick?: () => void;
}