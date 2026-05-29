import GuestGuard from '@/shared/components/guard/GuestGuard'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GuestGuard>
            {children}
        </GuestGuard>
    )
}

export default Layout