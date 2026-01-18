import { ROUTES } from '@/config/routes'
import { RegisterForm } from '@/features/auth/components/forms/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="space-y-8 fade-in animate-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Đăng ký tài khoản</h1>
        <p className="text-muted-foreground">Vui lòng nhập thông tin chi tiết để bắt đầu</p>
      </div>

      <RegisterForm />

      <div className="text-center">
        <span className="text-muted-foreground">Đã có tài khoản? </span>
        <Link href={ROUTES.LOGIN} className="text-primary hover:text-primary/80 font-medium">
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}