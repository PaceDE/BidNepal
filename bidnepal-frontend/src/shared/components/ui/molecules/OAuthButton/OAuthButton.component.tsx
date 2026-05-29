import Button from '../../atoms/Button'
import { OAuthButtonProps } from './OAuthButton.types'
import { ImSpinner9 } from "react-icons/im";

const OAuthButton = ({ provider, icon, onClick, lock }: OAuthButtonProps) => {
  return (
    <Button disabled={lock} onClick={onClick} className={`flex gap-2 justify-center items-center w-full text-sm font-semibold p-1.5! text-primary! rounded-md ${lock? "bg-primarybg" : "bg-white hover:bg-secondarybg!"}`}>
      <img src={icon} alt={`${provider} icon`} width={15} height={15} />
        Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  )
}

export default OAuthButton