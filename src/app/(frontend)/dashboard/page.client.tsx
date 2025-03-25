'use client'

import { buttonVariants } from '@/components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'

const DashboardPage = () => {
  return (
    <>
      <div>Welcome to your dashboard!</div>
      <LogoutLink className={buttonVariants({ variant: 'default' })}>Đăng xuất</LogoutLink>
    </>
  )
}

export default DashboardPage