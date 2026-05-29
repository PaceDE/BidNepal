"use client";

import { getAccountSetupRedirectPath } from '@/features/auth/lib/getRedirectPath';
import { useAppSelector } from '@/redux/hook'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const AccountSetupGuard = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAppSelector(state => state.auth);
    const redirectTo = !!user ? getAccountSetupRedirectPath(user) : null;

    useEffect(() => {
        if (!redirectTo)
            return
        if (redirectTo !== pathname)
            router.replace(redirectTo);
    }, [router, pathname, router])


    if (redirectTo && redirectTo !== pathname)
        return null

    return <>{children}</>
}

export default AccountSetupGuard