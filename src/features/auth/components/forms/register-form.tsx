// components/forms/register-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { FormErrorAnimate } from '@/features/auth/components/shared/form-error-animate'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { GoogleIcon } from '@/components/icons/google-icon'
import { registerSchema, RegisterFormValues } from '@/features/auth/auth.schema'
import authService from '@/features/auth/services/AuthService'
import { ROUTES } from '@/config/routes'

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "", 
      username: "", 
      schoolName: "", // Thêm default value
      studentId: "", 
      email: "", 
      password: "", 
      confirmPassword: "",
    },
  })

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const payload = {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        studentId: data.studentId.toUpperCase(),
        schoolName: data.schoolName // Lấy từ form data thay vì hardcode "FPT"
      }

      const response = await authService.registerAPI(payload)

      // Logic check response giữ nguyên theo chuẩn cũ của bạn
      if (response.isSuccess && response.statusCode === 200) {
        toast.success(response.data?.message || response.message || 'Đăng ký thành công')
        setTimeout(() => {
          router.push(ROUTES.LOGIN)
        }, 1500)
      } else {
        if (response.errors) {
          const errorMessages = Object.values(response.errors).flat()
          const errorMessage = errorMessages.join(', ') || response.message || 'Đăng ký thất bại'
          setError(errorMessage)
          toast.error(errorMessage)
        } else {
          setError(response.message || 'Đăng ký thất bại')
          toast.error(response.message || 'Đăng ký thất bại')
        }
      }
    } catch (err: any) {
      const errorMessage = 
        err?.response?.data?.message || 
        err?.response?.data?.errors ? 
          Object.values(err.response.data.errors).flat().join(', ') :
        err?.message || 
        'Đăng ký thất bại. Vui lòng thử lại.'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = "bg-muted/50 h-10 focus-visible:ring-1 focus-visible:ring-offset-0"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}
        
        {/* ROW 1: HỌ TÊN & USERNAME */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormLabel>Họ và tên</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="Nguyễn Văn A" {...field} className={inputClass} disabled={isLoading} />
                  </FormControl>
                  <FormErrorAnimate message={fieldState.error?.message} />
                </div>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormLabel>Tên đăng nhập</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="VD: hywang1412" {...field} className={inputClass} disabled={isLoading} />
                  </FormControl>
                  <FormErrorAnimate message={fieldState.error?.message} />
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* ROW 2: TÊN TRƯỜNG & MSSV */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
                control={form.control}
                name="schoolName"
                render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                    <FormLabel>Tên trường</FormLabel>
                    <div className="relative">
                    <FormControl>
                        <Input placeholder="Đại học FPT" {...field} className={inputClass} disabled={isLoading} />
                    </FormControl>
                    <FormErrorAnimate message={fieldState.error?.message} />
                    </div>
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="studentId"
                render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                    <FormLabel>MSSV</FormLabel>
                    <div className="relative">
                    <FormControl>
                        <Input placeholder="SE..." {...field} className={`${inputClass} uppercase placeholder:normal-case`} disabled={isLoading} />
                    </FormControl>
                    <FormErrorAnimate message={fieldState.error?.message} />
                    </div>
                </FormItem>
                )}
            />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} className={inputClass} disabled={isLoading} />
                </FormControl>
                <FormErrorAnimate message={fieldState.error?.message} />
              </div>
            </FormItem>
          )}
        />

        {/* Mật khẩu */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel>Mật khẩu</FormLabel>
              <div className="relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Tạo mật khẩu mạnh"
                      className={`${inputClass} pr-10`}
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
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

        {/* Nhập lại mật khẩu */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <div className="relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Xác nhận mật khẩu"
                      className={`${inputClass} pr-10`}
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormErrorAnimate message={fieldState.error?.message} />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-10 font-semibold mt-2" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng ký tài khoản
        </Button>
      </form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><Separator /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Hoặc đăng ký với</span>
        </div>
      </div>

      <Button variant="outline" className="w-full h-10 border-muted-foreground/20">
        <GoogleIcon className="mr-2 h-5 w-5" />
        Google
      </Button>
    </Form>
  )
}
