'use client'

import { AlertCircle, ArrowLeft, KeyRound, Loader2 } from 'lucide-react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'
import { ResetPasswordForm } from '@/features/auth/components/forms/reset-password-form'

function ResetPasswordLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm">Đang xác thực thông tin...</p>
    </div>
  )
}

function ResetPasswordView() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <div className="space-y-6 fade-in animate-in slide-in-from-bottom-2">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Liên kết không hợp lệ</AlertTitle>
          <AlertDescription>
            Đường dẫn đặt lại mật khẩu bị thiếu token hoặc không chính xác.
          </AlertDescription>
        </Alert>
        <Link href={ROUTES.FORGOT_PASSWORD} className="block w-full">
          <Button variant="outline" className="w-full">
            Yêu cầu gửi lại link
          </Button>
        </Link>
      </div>
    )
  }

  return <ResetPasswordForm token={token} />
}

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6 fade-in animate-in duration-500">
      
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Đặt lại mật khẩu
        </h1>
        <p className="text-muted-foreground">
          Vui lòng nhập mật khẩu mới cho tài khoản của bạn
        </p>
      </div>

      <Suspense fallback={<ResetPasswordLoading />}>
        <ResetPasswordView />
      </Suspense>

      <div className="text-center">
        <Link 
          href={ROUTES.LOGIN} 
          className="text-sm font-medium text-muted-foreground hover:text-primary inline-flex items-center transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  )
}