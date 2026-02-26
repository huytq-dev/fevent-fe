import { ROUTES } from '@/config/routes'
import { RegisterForm } from '@/features/auth/components/forms/register-form'
import { LoginRedirectGuard } from '@/features/auth/components/guards/login-redirect-guard'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <LoginRedirectGuard>
      <div className="space-y-6 fade-in animate-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Đăng ký tài khoản
          </h1>
          <p className="text-muted-foreground">
              Nhập thông tin chi tiết để bắt đầu hành trình
          </p>
        </div>

        <RegisterForm />

        <div className="text-center text-sm text-muted-foreground">
          Đã có tài khoản?{' '}
          <Link 
              href={ROUTES.LOGIN} 
              className="font-semibold text-primary hover:underline transition-all"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </LoginRedirectGuard>
  )
}
