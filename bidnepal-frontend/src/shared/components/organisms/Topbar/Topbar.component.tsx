"use client";
import { useState } from 'react'
import Logo from '../../atoms/Logo/Logo.component'
import Navbar from '../../molecules/Navbar'
import AuthButtons from '../../molecules/AuthButtons'
import CollapseNavbar from '../../molecules/CollapseNavbar/CollapseNavbar'
import { Layout } from '@/enums/layout.enums'
import HamburgerMenu from '../../atoms/HamburgerMenu/HamburgerMenu.component'

const Topbar = () => {
  const height = Layout.navBarHeight;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={`bg-card w-full sticky top-0 z-50`}>
      <div className={`border-theme border-b-2 px-4 py-7 flex justify-between items-center ${height}`}>
        <div className='flex items-center gap-4'>
          <label htmlFor="menu-toggle" className="cursor-pointer md:hidden">
            <HamburgerMenu open={menuOpen} />
          </label>
          <Logo />
        </div>
          
        <div className='hidden md:block'>
          <Navbar />
        </div>

        <div>
          <AuthButtons /> 
        </div>
      </div>
      
      <input
        type="checkbox"
        id="menu-toggle"
        className='peer hidden'
        checked={menuOpen}
        onChange={() => setMenuOpen((prev) => !prev)}
      />
      
      <div className={`w-full block border-t-2 border-theme peer-not-checked:hidden md:hidden`}>
        <CollapseNavbar />
      </div>

    </div>
  )
}

export default Topbar
