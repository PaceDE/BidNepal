import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const HamburgerMenu = ({ open }: { open: boolean }) => {
    return (
        <>
            {!open ? (
                <GiHamburgerMenu aria-label="Open Navbar" className="text-2xl text-secondary cursor-pointer md:hidden" />
            ) : (
                <IoClose aria-label="Close Navbar" className="text-2xl text-secondary cursor-pointer md:hidden" />
            )}
        </>
    )
}

export default HamburgerMenu