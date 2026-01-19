import { Sparkles } from "lucide-react";
import { EventCarousel } from "../blocks/event-carousel";
import { RECOMMENDED_EVENTS } from "../../mock-data";

export function RecommendedSection() {
  return (
    <section className="border-t bg-gradient-to-b from-background to-muted/40 py-16 md:py-20">
      <div className="container mx-auto space-y-8 px-4">
        {/* Header with Icon */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">
              Dành cho sinh viên IT
            </h2>
            <p className="text-base text-muted-foreground">
              Gợi ý sự kiện dựa trên chuyên ngành Kỹ thuật phần mềm của bạn.
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <EventCarousel events={RECOMMENDED_EVENTS} />
      </div>
    </section>
  );
}
