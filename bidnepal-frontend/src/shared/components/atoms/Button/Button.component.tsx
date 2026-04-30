import React from 'react'
import { ButtonProps } from './'

const Button = ({children, onClick, style}:ButtonProps) => {
  return (
    <button className={`text-white bg-theme border-2 border-border-primary rounded-2xl px-4 py-1 hover:bg-theme-dark ${style || ""}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button