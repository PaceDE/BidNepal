"use client"; 

import { ButtonProps } from './'

const Button = ({children, onClick, disabled=false, className, type="button"}:ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`text-white bg-theme border-2 border-border-primary rounded-2xl px-4 py-1 hover:bg-theme-dark ${className || ""}`}>
      {children}
    </button>
  )
}

export default Button