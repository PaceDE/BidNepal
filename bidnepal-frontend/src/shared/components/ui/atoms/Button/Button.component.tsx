"use client"; 
import {twMerge} from "tailwind-merge";

import { ButtonProps } from './Button.types'

const Button = ({children, onClick, disabled=false, className, type="button"}:ButtonProps) => {
  const style = twMerge("text-white bg-theme border-2 border-border-primary rounded-2xl px-4 py-1 hover:bg-theme-dark disabled:bg-gray-500", className);
  return (
    <button type={type} onClick={onClick} className={style}>
      {children}
    </button>
  )
}

export default Button