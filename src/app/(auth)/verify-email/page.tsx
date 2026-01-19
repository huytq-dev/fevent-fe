import { VerifyEmailView } from '@/features/auth/components/forms/verify-email-view'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Xác thực Email | FEvents',
  description: 'Vui lòng chờ trong khi chúng tôi xác thực tài khoản của bạn.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md space-y-6"> 
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Xác thực tài khoản</h1>
        <p className="text-sm text-muted-foreground mt-2">
           Hệ thống đang kiểm tra thông tin của bạn.
        </p>
      </div>

      <Suspense fallback={<VerifyEmailLoading />}>
        <VerifyEmailView />
      </Suspense>
    </div>
  )
}

function VerifyEmailLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 rounded-lg border bg-card text-card-foreground shadow-sm animate-in fade-in-50">
      <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
      <div className="text-center space-y-1">
        <p className="font-medium">Đang xử lý...</p>
        <p className="text-xs text-muted-foreground">Vui lòng không tắt trình duyệt</p>
      </div>
    </div>
  )
}