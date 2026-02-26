'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { ROUTES } from '@/config/routes'
import { isAuthenticated } from '@/utils/authUtils'

export function LoginRedirectGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace(ROUTES.HOME)
    }
  }, [router])

  return <>{children}</>
}
