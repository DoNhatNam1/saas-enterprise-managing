'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface HeaderClientProps {
  header: Header
  isAuthenticated: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, isAuthenticated }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 border-b border-border flex justify-between items-center">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert-0" />
        </Link>
        
        <div className="flex items-center gap-8">
          <HeaderNav header={header} />
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link 
                href="/dashboard" 
                className={buttonVariants({ 
                  variant: "default",
                  className: "flex items-center gap-2"
                })}
              >
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <LoginLink className={buttonVariants({ variant: "outline", className: "dark:text-white" })}>
                  Đăng nhập
                </LoginLink>
                <RegisterLink className={buttonVariants({ variant: "default" })}>
                  Đăng ký
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
