import React from 'react'
import NavButton from '../../atoms/NavButton'

const navItems = [
    { label: "Auctions", href: "/" },
    { label: "Bidding", href: "/bidding" },
    { label: "Sell", href: "/sell" },
    { label: "Contact", href: "/contact" },
]

const Navbar = () => {
    return (
        <div className='flex justify-center w-full gap-4'>
            {navItems.map((item) => (
                <NavButton key={item.href} to={item.href}>
                    {item.label}
                </NavButton>
            ))}
        </div>
    )
}

export default Navbar