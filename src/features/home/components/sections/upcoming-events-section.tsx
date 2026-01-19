import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventCarousel } from "../blocks/event-carousel";
import { UPCOMING_EVENTS } from "../../mock-data";

export function UpcomingEventsSection() {
  return (
    <section className="container mx-auto space-y-8 px-4 pt-16 pb-12 md:pt-20 md:pb-16">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
            Sắp diễn ra
          </h2>
          <p className="text-lg text-muted-foreground">
            Đừng bỏ lỡ các sự kiện hot nhất trong tuần này.
          </p>
        </div>

        <Button
          asChild
          variant="ghost"
          className="group text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/events" className="flex items-center gap-2">
            Xem tất cả
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Carousel Section */}
      <EventCarousel events={UPCOMING_EVENTS} />
    </section>
  );
}
