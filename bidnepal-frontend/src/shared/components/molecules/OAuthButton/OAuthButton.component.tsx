import Button from '../../atoms/Button'
import { OAuthButtonProps } from './OAuthButton.types'

const OAuthButton = ({provider, icon, onClick}:OAuthButtonProps) => {
  return (
    <Button onClick={onClick} className='flex gap-2 justify-center items-center w-full text-sm font-semibold p-1.5! bg-white text-primary! rounded-md hover:bg-secondarybg!'>
        <img src={icon} alt={`${provider} icon`} width={15} height={15} />
        Continue with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </Button>
  )
}

export default OAuthButton