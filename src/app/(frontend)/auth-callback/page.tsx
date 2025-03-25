'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthStatus } from './action'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const result = await getAuthStatus()
        if (result.shouldCompleteRegistration) {
          router.push('/dang-ky')
        } else {
          router.push('/dashboard')
        }
      } catch (err) {
        console.error(err)
        router.push('/')
      }
    }

    handleAuth()
  }, [router])

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <h3 className="font-semibold text-xl">Đang thiết lập tài khoản...</h3>
        <p className="text-muted-foreground">Bạn sẽ được chuyển hướng tự động.</p>
      </div>
    </div>
  )
}
