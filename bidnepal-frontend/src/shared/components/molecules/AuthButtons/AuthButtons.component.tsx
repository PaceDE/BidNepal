import React from 'react'
import Button from '../../atoms/Button'

const AuthButtons = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
        <Button style="bg-white !text-secondary border-border-primary hover:bg-theme-light ">Sign in</Button>
        <Button>Register</Button> 
    </div>
  )
}

export default AuthButtons
