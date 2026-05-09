import { InputProps } from "./Input.types";

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`border border-border-primary rounded-md px-3 py-2 outline-none focus:border-theme transition-colors duration-500 ease-in-out ${className || ""}`}
    />
  );
};

export default Input;