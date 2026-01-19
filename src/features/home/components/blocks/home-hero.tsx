import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HomeHero() {
  return (
    <section className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background md:h-[600px]">

      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
          alt="FEvents Background"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 container px-4 md:px-6 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground drop-shadow-lg md:text-6xl">
          Bùng nổ đam mê tại <span className="text-primary">FEvents</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground drop-shadow-md md:text-xl">
          Khám phá hàng trăm sự kiện hấp dẫn, kết nối cộng đồng và tích lũy điểm rèn luyện ngay hôm nay.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/events">
            <Button
              size="lg"
              className="bg-primary px-8 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
            >
              Khám phá ngay
            </Button>
          </Link>
          <Link href="/clubs">
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 bg-background/10 text-foreground backdrop-blur-sm transition-transform hover:scale-105 hover:bg-background/20"
            >
              Tìm CLB
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
