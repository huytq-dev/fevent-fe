import { MenuButton } from '@/components/common/menu-button'
import { CalendarFold } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen w-full flex font-sans bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
            alt="FPT University Campus Background"
            fill
            className="object-cover opacity-60"
            priority
            sizes="50vw"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full h-full">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-transform group-hover:scale-105">
              <CalendarFold className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">FEvents</span>
          </Link>

          <div className="flex-1 flex flex-col justify-center max-w-md">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Bắt đầu hành trình.</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Tham gia nền tảng sự kiện chính thức của Đại học FPT.
            </p>
          </div>

          <div className="text-sm text-white/80">
            © {currentYear} FEvents. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-background relative">

        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <MenuButton />
        </div>

        <div className="lg:hidden w-full max-w-md mb-8 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <CalendarFold className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">FEvents</span>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}