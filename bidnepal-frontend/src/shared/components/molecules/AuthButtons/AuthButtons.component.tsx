import React from 'react'
import Button from '../../atoms/Button'
import NavButton from '../../atoms/NavButton'

const AuthButtons = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
        <NavButton to="/login" style="!bg-white !text-secondary hover:!bg-theme-light ">Sign in</NavButton>
        <NavButton to="/register">Register</NavButton> 
    </div>
  )
}

export default AuthButtons
