"use client";

import { TextButtonProps } from "./TextButton.types";

const TextButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  color = "theme",
}: TextButtonProps) => {
  const colorMap: Record<string, string> = {
    theme: "text-theme hover:text-theme-dark",
    primary: "text-primary hover:text-secondary",
    secondary: "text-secondary hover:text-muted",
    green: "text-green hover:text-green-dark",
    red: "text-red hover:text-error",
    muted: "text-muted hover:text-primary",
  };

  const baseStyle =
    "font-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const colorStyle = colorMap[color] || colorMap.theme;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${colorStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default TextButton;
