'use client'

import { Layers } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* 1. Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* 2. Logo Area */}
      <div className="absolute top-8 left-8 z-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105',
              'bg-card border border-border shadow-sm',
            )}
          >
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Fevent
            <span className="font-light text-muted-foreground">FE</span>
          </span>
        </Link>
      </div>

      <main className="relative z-10 w-full max-w-4xl p-4 md:p-8">{children}</main>

      {/* 4. Footer */}
      <footer className="absolute bottom-6 w-full text-center text-xs text-muted-foreground z-10">
        <p>© 2026 Fevent FE. All rights reserved.</p>
      </footer>
    </div>
  )
}
