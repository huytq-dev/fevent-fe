'use client'

import { CalendarFold } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background text-foreground antialiased">
      <div className="relative flex flex-col items-center space-y-8 animate-appear">
        {/* 1. Logo Section - Giống header */}
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4">
            <CalendarFold className="h-6 w-6 text-primary" strokeWidth={2.5} />
          </div>

          {/* Text Info */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              FEvents
            </h1>
            <p className="text-sm font-normal text-muted-foreground">Quản lý sự kiện chuyên nghiệp</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 h-4">
          <div
            className="h-2.5 w-2.5 rounded-full bg-foreground animate-subtle-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="h-2.5 w-2.5 rounded-full bg-foreground animate-subtle-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="h-2.5 w-2.5 rounded-full bg-foreground animate-subtle-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>

        <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground animate-pulse">
          Đang tải hệ thống
        </div>
      </div>
    </div>
  )
}
