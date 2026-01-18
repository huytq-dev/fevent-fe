import { GoogleIcon } from '@/components/icons/google-icon'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/config/routes'
import { LoginForm } from '@/features/auth/components/forms/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="space-y-8 fade-in animate-in duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Chào mừng bạn đến với FEvents
        </h1>
        <p className="text-muted-foreground">
          Vui lòng đăng nhập vào tài khoản của bạn
        </p>
      </div>

      <LoginForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground font-medium">
            Hoặc tiếp tục với
          </span>
        </div>
      </div>

      <Button variant="outline" size="lg" className="w-full relative">
        <GoogleIcon className="mr-2 h-5 w-5" />
        Tiếp tục với Google
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Bạn không có tài khoản?{' '}
        <Link href={ROUTES.REGISTER} className="font-semibold text-primary hover:underline">
          Đăng ký
        </Link>
      </div>
    </div>
  )
}