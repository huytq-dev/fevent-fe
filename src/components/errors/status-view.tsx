'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { ROUTES } from '@/config/routes'

interface StatusViewProps {
  icon: ReactNode
  bgIconColorClass: string
  title: string
  message: string
  actionLabel?: string
  actionLink?: string
  showBackButton?: boolean
  children?: ReactNode
}

export default function StatusView({
  icon,
  bgIconColorClass,
  title,
  message,
  actionLabel = 'Trang chủ',
  actionLink = ROUTES.DASHBOARD,
  showBackButton = true,
  children,
}: StatusViewProps) {
  const router = useRouter()

  return (
    <div className="flex w-full flex-col items-center text-center animate-in fade-in zoom-in duration-300">
      {/* Icon Area */}
      <div
        className={cn(
          'flex h-20 w-20 items-center justify-center rounded-full mb-6',
          bgIconColorClass,
        )}
      >
        {icon}
      </div>

      {/* Text Content */}
      <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">{title}</h1>
      <p className="mx-auto mb-8 max-w-lg wrap-break-word text-base leading-relaxed text-muted-foreground">
        {message}
      </p>

      {children ? (
        children
      ) : (
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          {showBackButton && (
            <Button variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
              Quay lại
            </Button>
          )}

          {actionLabel && actionLink && (
            <Button asChild className="w-full sm:w-auto">
              <Link href={actionLink}>{actionLabel}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
