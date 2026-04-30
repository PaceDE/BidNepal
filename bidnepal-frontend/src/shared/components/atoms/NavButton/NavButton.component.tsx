"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavButtonProps } from "./";

const NavButton = ({
  children, 
  to, 
  activeClass = "bg-theme text-white", 
  inActiveClass = "text-secondary hover:text-theme ",
  style, 
  onClick
}:NavButtonProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = pathname === to;
    
    const handleNavigation = () => {
       router.push(to);
    }
  return (
    <button className={`rounded-2xl px-4 py-1 ${isActive ? activeClass : inActiveClass} ${style || ""}`} onClick={handleNavigation}>
        {children}
    </button>
  )
}

export default NavButton
