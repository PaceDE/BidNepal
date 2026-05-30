"use client";

import { getAccountSetupRedirectPath } from '@/features/auth/lib/getRedirectPath';
import { useAppSelector } from '@/redux/hook'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const GuestGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { user } = useAppSelector(state => state.auth);
    const redirectTo = !!user ? getAccountSetupRedirectPath(user) || "/" : null;
    
     useEffect(() => {
        if (!user || !redirectTo) return;
            
        router.replace(redirectTo);

    }, [user,router,redirectTo]);

    if (!!user)
        return null;

    return (
        <>{children}</>
    )
}

export default GuestGuard