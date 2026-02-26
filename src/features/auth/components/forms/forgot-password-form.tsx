'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, CheckCircle } from 'lucide-react'
import { FormErrorAnimate } from '@/features/auth/components/shared/form-error-animate'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from '@/features/auth/auth.schema'
import authService from '@/services/AuthService'

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await authService.forgotPasswordAPI({
        email: data.email,
      })

      if (response.isSuccess && response.statusCode === 200) {
        setSubmittedEmail(data.email)
        setIsSubmitted(true)
        toast.success('Email đặt lại mật khẩu đã được gửi')
      } else {
        setError(response.message || 'Gửi email thất bại')
        toast.error('Gửi email thất bại')
      }
    } catch (err: any) {
      const errorMessage = 
        err?.response?.data?.message || 
        err?.message || 
        'Gửi email thất bại. Vui lòng thử lại.'
      setError(errorMessage)
      toast.error('Gửi email thất bại')
    } finally {
      setIsLoading(false)
    }
  }

  // Giao diện Thành công (Success View)
  if (isSubmitted) {
    return (
      <div className="space-y-6 fade-in animate-in slide-in-from-bottom-2 duration-500">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Kiểm tra email của bạn</h3>
            <p className="text-muted-foreground max-w-xs mx-auto text-sm">
              Chúng tôi đã gửi liên kết đặt lại mật khẩu đến <span className="font-medium text-foreground">{submittedEmail}</span>
            </p>
          </div>
        </div>

        <Alert className="border-primary/20 bg-primary/5">
          <Mail className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-medium text-sm">Gợi ý</AlertTitle>
          <AlertDescription className="text-primary/80 text-xs">
            Nếu bạn không thấy email, vui lòng kiểm tra thư mục spam.
          </AlertDescription>
        </Alert>

        <Button
          variant="outline"
          className="w-full h-10"
          onClick={() => {
            setIsSubmitted(false)
            setError(null)
            form.reset()
          }}
        >
          Thử email khác
        </Button>
      </div>
    )
  }

  // Giao diện Form nhập liệu
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 fade-in animate-in duration-500">
        {/* ERROR MESSAGE */}
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              {/* --- WRAPPER DIV --- */}
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="name@fpt.edu.vn"
                    type="email"
                    className="h-10 bg-muted/50 focus-visible:ring-1 focus-visible:ring-offset-0"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormErrorAnimate message={fieldState.error?.message} />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full h-10 font-semibold" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Mail className="mr-2 h-4 w-4" />
          )}
          Gửi liên kết đặt lại
        </Button>
      </form>
    </Form>
  )
}

