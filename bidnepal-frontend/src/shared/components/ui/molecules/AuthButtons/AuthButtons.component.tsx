"use client";
import React from 'react'
import Button from '../../atoms/Button/Button.component'
import NavButton from '../../atoms/NavButton/NavButton.component'
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TbLogout } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa"
import { useLogout } from '@/features/auth/api/auth.hooks';

const AuthButtons = () => {
  const { user } = useAppSelector(state => state.auth);
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  }

  if (!user)
    return (
      <div className='flex justify-center items-center gap-2'>
        <NavButton to="/login" style="!bg-white !text-secondary hover:!bg-theme-light ">Sign in</NavButton>
        <NavButton to="/register">Register</NavButton>
      </div>
    )

  return (
    <div className='flex justify-center items-center gap-5'>
      <div className='size-8 overflow-hidden'>
        {user?.avatar ? (
          <div className='w-full h-full rounded-full overflow-hidden'>
            <img src={user.avatar} className='w-full h-full object-contain' />
          </div>
        ) : (
          <FaUserCircle className='text-theme w-full h-full' />
        )}
      </div>
      <Button onClick={handleLogout}> <TbLogout /> </Button>
    </div>
  )
}

export default AuthButtons
