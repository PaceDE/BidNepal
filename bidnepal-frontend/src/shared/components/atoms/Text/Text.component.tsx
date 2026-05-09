import Link from "next/link";
import React from "react";

type TextVariant = "body" | "muted" | "link" | "heading" | "label" | "error";

type TextProps = {
    children: React.ReactNode;
    variant?: TextVariant;
    component?: React.ElementType;
    htmlFor?: string;
    href?: string;
    className?: string;
}

const Text = ({
    children,
    variant = "body",
    component = "p",
    htmlFor,
    href,
    className,
}: TextProps) => {

    const styles: Record<TextVariant, string> = {
        body: "text-primary",
        muted: "text-secondary text-[0.85rem]",
        link: "text-theme text-[0.85rem] font-semibold cursor-pointer hover:text-theme-dark",
        heading: "text-primary text-[1.25rem] font-bold mb-0.5",
        label: "text-sm font-medium text-secondary",
        error: "text-xs text-red-500"
    };

    const defaultTag = variant === "heading" ? "h1"
        : variant === "label" ? "label"
            : "p";

    const Component = component || defaultTag;
    const labelProps = variant === "label" && htmlFor ? { htmlFor } : {};

    if (variant === "link" && href) {
        return (
            <Link href={href} className={`${styles.link} ${className || ""}`}>
                {children}
            </Link>
        );
    }


    return (
        <Component  {...labelProps} className={`${styles[variant]} ${className || ""}`}>
            {children}
        </Component>
    );
};

export default Text;