import { ROUTES } from '@/config/routes'
import { ForgotPasswordForm } from '@/features/auth/components/forms/forgot-password-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8 fade-in animate-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Quên mật khẩu
        </h1>
        <p className="text-muted-foreground">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="text-center">
        <Link 
          href={ROUTES.LOGIN} 
          className="text-sm font-medium text-muted-foreground hover:text-primary inline-flex items-center transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  )
}