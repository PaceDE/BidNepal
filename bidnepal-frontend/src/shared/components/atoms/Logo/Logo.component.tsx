import { LogoProps } from "./";

const Logo = ({ style }: LogoProps) => {
  return (
    <div aria-label="logo - BidNepal">
        <span className={`text-lg font-extrabold font-syne text-theme ${!!style ? style : ""}`}>Bid<span className="text-black">Nepal</span></span>
    </div>
  )
}

export default Logo;