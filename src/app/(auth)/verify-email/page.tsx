// app/verify-email/page.tsx
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { VerifyEmailView } from '@/features/auth/components/forms/verify-email-view'

export const metadata = {
  title: 'Xác thực Email | FEvents',
  description: 'Xác thực tài khoản người dùng',
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Suspense fallback={<PageLoading />}>
        <VerifyEmailView />
      </Suspense>
    </div>
  )
}

function PageLoading() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Đang tải...</p>
    </div>
  )
}