'use client'

import { ArrowRight, CheckCircle2, Loader2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { ROUTES } from '@/config/routes'
import authService from '@/services/AuthService'

export function VerifyEmailView() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Đang xác thực email của bạn...')

  const isCalledRef = useRef(false)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('Token xác thực không tồn tại hoặc không hợp lệ.')
      return
    }

    if (isCalledRef.current) return
    isCalledRef.current = true

    const verify = async () => {
      try {
        const response = await authService.confirmEmailAPI(token)
        
        if (response.isSuccess && response.statusCode === 200) {
          setStatus('success')
          setMessage('Email của bạn đã được xác thực thành công!')
        } else {
          setStatus('error')
          setMessage('Xác thực thất bại.')
        }
      } catch (error: any) {
        setStatus('error')
        const errorMessage = 'Link xác thực đã hết hạn hoặc không hợp lệ.'
        setMessage(errorMessage)
      }
    }

    verify()
  }, [token])

  const StatusIcon = () => {
    if (status === 'loading') {
      return (
        <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-blue-50/50">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        </div>
      )
    }
    if (status === 'success') {
      return (
        <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center ring-8 ring-green-50/50">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
      )
    }
    return (
      <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center ring-8 ring-red-50/50">
        <XCircle className="h-10 w-10 text-red-600" />
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-none bg-transparent animate-in fade-in zoom-in duration-500">
      
      <CardHeader className="flex flex-col items-center space-y-4 pb-2">
        <div className="mb-2">
           <StatusIcon />
        </div>

        <CardTitle className="text-2xl font-bold text-center">
          {status === 'loading' && 'Đang xác thực...'}
          {status === 'success' && 'Xác thực thành công'}
          {status === 'error' && 'Xác thực thất bại'}
        </CardTitle>

        <CardDescription className="text-center text-base max-w-xs mx-auto">
          {message}
        </CardDescription>
      </CardHeader>

      <CardContent>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-0">
        {status === 'success' ? (
          <Link href={ROUTES.LOGIN} className="w-full">
            <Button className="w-full h-11 text-base font-semibold shadow-sm">
              Đăng nhập ngay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : status === 'error' ? (
          <div className="w-full space-y-2">
            <Link href={ROUTES.HOME} className="w-full">
              <Button variant="outline" className="w-full h-11 border-dashed">
                Về trang chủ
              </Button>
            </Link>
          </div>
        ) : (
          <Button disabled variant="ghost" className="w-full h-11 bg-muted/50">
            Vui lòng chờ giây lát...
          </Button>
        )}
      </CardFooter>
      
    </Card>
  )
}
