import React from 'react'
import NavButton from '../../atoms/NavButton'

const navItems = [
    { label: "Auctions", href: "/" },
    { label: "Bidding", href: "/bidding" },
    { label: "Sell", href: "/sell" },
    { label: "Contact", href: "/contact" },
]

const CollapseNavbar = () => {
    return (
        <div className='flex flex-col justify-center w-full gap-2'>
            {navItems.map((item) => (
                <div className="px-4 py-2 border-b-2 border-border-divider " key={item.href}>
                    <NavButton to={item.href} activeClass='text-theme'>
                        {item.label}
                    </NavButton>
                </div>
            ))}
        </div>
    )
}

export default CollapseNavbar