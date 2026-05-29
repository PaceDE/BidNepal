import { NavButtonProps } from ".";
import Link from "next/link";

const NavButton = ({
  children, 
  to, 
  style, 
}:NavButtonProps) => {
  
  return (
    <Link href={to} className={`bg-theme text-white border-2 border-border-primary rounded-2xl px-4 py-1 hover:bg-theme-dark ${style || ""}`}>
        {children}
    </Link>
  )
}

export default NavButton
