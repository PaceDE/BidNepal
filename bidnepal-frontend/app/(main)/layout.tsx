import AccountSetupGuard from '@/shared/components/guard/AccountSetupGuard'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
   <AccountSetupGuard>
    {children}
   </AccountSetupGuard>
  )
}

export default Layout