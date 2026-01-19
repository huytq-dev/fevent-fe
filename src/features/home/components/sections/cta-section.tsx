import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-primary py-20 text-primary-foreground">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-15">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-foreground/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-foreground/30 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto space-y-8 px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Bạn muốn tổ chức sự kiện?
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
          Đăng ký trở thành Organizer ngay hôm nay để quản lý vé, check-in QR Code và tiếp cận hàng ngàn sinh viên FPT một cách chuyên nghiệp.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button size="lg" variant="secondary" className="h-12 w-full px-8 text-lg font-bold text-primary sm:w-auto">
            Đăng ký Organizer
          </Button>
          <Button size="lg" variant="outline" className="h-12 w-full border-primary-foreground/60 bg-transparent px-8 text-lg text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
            Liên hệ hỗ trợ
          </Button>
        </div>
      </div>
    </section>
  );
}
