'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, LockKeyhole } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { ROUTES } from '@/config/routes'
import { resetPasswordSchema, ResetPasswordFormValues } from '@/features/auth/auth.schema'
import authService from '@/services/AuthService'

// Component hiển thị lỗi animation
const FormErrorAnimate = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ height: 0, opacity: 0, y: -5 }}
        animate={{ height: "auto", opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -5 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="text-[0.8rem] font-medium text-destructive mt-1 leading-none">
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ResetPasswordFormValues) {
    setIsLoading(true)
    try {
      const response = await authService.resetPasswordAPI({
        token: token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })

      if (response.isSuccess && response.statusCode === 200) {
        toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập.")
        router.push(ROUTES.LOGIN)
      } else {
        toast.error("Đặt lại mật khẩu thất bại.")
      }
    } catch (error: any) {
      toast.error("Đặt lại mật khẩu thất bại.")
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = "h-10 bg-muted/50 focus-visible:ring-1 focus-visible:ring-offset-0 pr-10"

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* NEW PASSWORD */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel>Mật khẩu mới</FormLabel>
              <div className="relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu mới"
                      className={inputClass}
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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

        {/* CONFIRM PASSWORD */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <div className="relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu mới"
                      className={inputClass}
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

        <Button type="submit" className="w-full h-10 font-semibold shadow-sm mt-2" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LockKeyhole className="mr-2 h-4 w-4" />
          )}
          Đổi mật khẩu
        </Button>

      </form>
    </Form>
  )
}

