export type TextButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?: "theme" | "primary" | "secondary" | "green" | "red" | "muted";
};
