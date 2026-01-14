'use client'

import { AlertOctagon, Layers, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import './globals.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden font-sans">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="absolute top-8 left-8 z-10">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border shadow-sm">
                <Layers className="h-6 w-6 text-destructive" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Fevent
                <span className="font-light text-muted-foreground">FE</span>
              </span>
            </Link>
          </div>

          {/* --- NỘI DUNG CHÍNH --- */}
          <main className="relative z-10 w-full max-w-4xl p-4 md:p-8 flex flex-col items-center gap-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 animate-pulse">
              <AlertOctagon className="h-12 w-12 text-destructive" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                500 - Critical Error
              </h1>
              <p className="text-xl text-muted-foreground">
                Hệ thống gặp lỗi nghiêm trọng và không thể tải giao diện chính.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg max-w-2xl mx-auto overflow-auto text-left border border-border">
                <p className="font-mono text-sm text-red-600 break-all">{error.message}</p>
                {error.digest && (
                  <p className="font-mono text-xs text-muted-foreground mt-2">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                size="lg"
                onClick={() => reset()}
                className="bg-destructive hover:bg-destructive/90 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Thử khởi động lại
              </Button>

              <Link href="/">
                <Button size="lg" variant="outline">
                  Về trang chủ (Tải lại)
                </Button>
              </Link>
            </div>
          </main>

          <footer className="absolute bottom-6 w-full text-center text-xs text-muted-foreground z-10">
            <p>System Failure Recovery Mode &bull; Fevent FE</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
