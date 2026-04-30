import { LogoProps } from "./";

const Logo = ({ style }: LogoProps) => {
  return (
    <div aria-label="logo - BidNepal" className={style}>
        <span className="text-lg font-bold font-syne text-theme">Bid<span className="text-black">Nepal</span></span>
    </div>
  )
}

export default Logo;