"use client";

import { usePathname } from "next/navigation";
import { NavLinkProps } from ".";
import Link from "next/link";

const NavLink = ({
  children, 
  to, 
  activeClass = "bg-theme text-white", 
  inActiveClass = "text-secondary hover:text-theme ",
  style, 
}:NavLinkProps) => {

    const pathname = usePathname();
    const isActive = pathname === to;  

  return (
    <Link href={to} className={`rounded-2xl px-4 py-1 ${isActive ? activeClass : inActiveClass} ${style || ""}`}>
        {children}
    </Link>
  )
}

export default NavLink
