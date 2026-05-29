import { InputProps } from "./Input.types";
import { twMerge } from "tailwind-merge";

const Input = ({ className, ...props }: InputProps) => {
  const style = twMerge("border border-border-primary rounded-md px-3 py-2 outline-none focus:border-theme transition-colors duration-500 ease-in-out" , className)
  return (
    <input
      {...props}
      className={style}
    />
  );
};

export default Input;