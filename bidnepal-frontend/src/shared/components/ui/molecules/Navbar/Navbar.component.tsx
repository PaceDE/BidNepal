import NavLink from '../../atoms/NavLink/NavLink.component'

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
                <NavLink key={item.href} to={item.href}>
                    {item.label}
                </NavLink>
            ))}
        </div>
    )
}

export default Navbar