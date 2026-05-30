"use client";
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { AUTH_STATUS } from '@/features/auth/auth.constants';
import { usePathname } from 'next/navigation';


const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { user,status } = useAppSelector(state => state.auth);
    const pathname = usePathname();

    useEffect(() => {
        if (!user){
            const reason = status === AUTH_STATUS.EXPIRED ? "session_expired" : "login_required";
            window.location.replace(`/login?next${encodeURIComponent(pathname)}&reason=${encodeURIComponent(reason)}`);
        }
    }, [user,status,pathname])

    if (!user)
        return null;

    return <>{children}</>
};

export default AuthGuard;