import { ThemeProvider } from '@/components/common/theme-provider'
import { Toaster } from '@/components/ui/sonner'
// import { AuthProvider } from '@/providers/AuthProvider'
import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FEvent - Hệ thống quản lí sự kiện',
  description: 'Hệ thống quản lí sự kiện',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className={`${beVietnamPro.className} antialiased`}
      >
        {/* <AuthProvider> */}
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster />
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}