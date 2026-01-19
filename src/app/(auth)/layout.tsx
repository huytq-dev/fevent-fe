import { MenuButton } from '@/components/common/menu-button'
import { CalendarFold } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BrandLogo = ({ className = "", iconClass = "h-7 w-7", textClass = "text-2xl" }: { className?: string, iconClass?: string, textClass?: string }) => (
  <Link href="/" className={`flex items-center gap-3 group w-fit ${className}`}>
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm transition-transform group-hover:scale-105">
      <CalendarFold className={`${iconClass}`} />
    </div>
    <span className={`font-bold tracking-tight ${textClass}`}>FEvents</span>
  </Link>
)

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen w-full font-sans bg-background overflow-hidden">

      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
            alt="FPT University Campus"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full h-full">
          <div className="text-white">
            <BrandLogo iconClass="h-7 w-7 text-white" />
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
              Bắt đầu hành trình <br />sinh viên rực rỡ.
            </h1>
            <p className="text-lg xl:text-xl text-white/90 leading-relaxed drop-shadow-md">
              Tham gia nền tảng sự kiện chính thức của Đại học FPT. Kết nối, trải nghiệm và trưởng thành.
            </p>
          </div>

          <div className="text-sm text-white/60">
            © {currentYear} FEvents. Built by F-Code.
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-background relative overflow-y-auto">

        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <MenuButton />
        </div>

        <div className="lg:hidden w-full max-w-sm mb-8">
          <BrandLogo iconClass="h-6 w-6 text-primary" textClass="text-xl" />
        </div>

        <main className="w-full max-w-sm space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}