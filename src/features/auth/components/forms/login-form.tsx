'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react' // Thêm icon AlertCircle
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert' // Dùng component Alert chuẩn

import { ROUTES } from '@/config/routes'
import { FormErrorAnimate } from '@/features/auth/components/shared/form-error-animate'
import { LoginFormValues, loginSchema } from '@/features/auth/auth.schema'
import authService from '@/features/auth/services/AuthService'
import { saveAuthToken, saveUserDataFromTokenString } from '@/utils/authUtils'

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rootError, setRootError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setRootError(null)

    try {
      const response = await authService.loginAPI({
        email: data.email,
        password: data.password,
        rememberMe: data.remember,
      })

      if (response.isSuccess && response.statusCode === 200) {
        toast.success(response.message || 'Đăng nhập thành công')
        
        const tokenData = response.data
        if (tokenData?.accessToken) {
          saveAuthToken(tokenData.accessToken)
          saveUserDataFromTokenString(tokenData.accessToken)
        }

        router.push(ROUTES.HOME)
        router.refresh()
      } else {
        setRootError(response.message || 'Đăng nhập thất bại')
      }
    } catch (err: any) {
      const errorMessage = 
        err?.response?.data?.message || 
        err?.message || 
        'Đăng nhập thất bại. Vui lòng thử lại.'
      
      setRootError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = "h-10 bg-muted/50 focus-visible:ring-1 focus-visible:ring-offset-0 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {rootError && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-1 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi đăng nhập</AlertTitle>
            <AlertDescription>
              {rootError}
            </AlertDescription>
          </Alert>
        )}

        {/* EMAIL FIELD */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className={inputClass}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormErrorAnimate message={fieldState.error?.message} />
              </div>
            </FormItem>
          )}
        />

        {/* PASSWORD FIELD */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>Mật khẩu</FormLabel>
                <Link
                  href={ROUTES.FORGOT_PASSWORD}
                  className="text-xs font-medium text-primary hover:underline"
                  tabIndex={-1}
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      className={`${inputClass} pr-10`}
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormErrorAnimate message={fieldState.error?.message} />
              </div>
            </FormItem>
          )}
        />

        {/* REMEMBER ME */}
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-0.5 space-y-0 pt-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer m-0">
                Ghi nhớ đăng nhập
              </FormLabel>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-10 font-semibold mt-2 shadow-sm" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
