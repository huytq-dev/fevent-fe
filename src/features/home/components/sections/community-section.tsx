import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeaturedClubs } from "../blocks/featured-clubs";

export function CommunitySection() {
  return (
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="container mx-auto space-y-10 px-4">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Cộng đồng năng động
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Kết nối với hơn 50+ CLB và đội nhóm tại FPT. Tìm nơi thuộc về bạn và
            phát triển đam mê!
          </p>
        </div>

        <FeaturedClubs />

        <div className="flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[180px] border-primary/20 hover:bg-primary/10 hover:text-primary"
          >
            <Link href="/clubs">Xem toàn bộ CLB</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
