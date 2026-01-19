import dynamic from "next/dynamic";
import { HomeHeroSection } from "@/features/home/components/sections/home-hero-section";
import { Skeleton } from "@/components/ui/skeleton";


const UpcomingEventsSection = dynamic(
  () => import("@/features/home/components/sections/upcoming-events-section").then((mod) => mod.UpcomingEventsSection),
  {
    loading: () => <SectionSkeleton />,
  }
);

const CommunitySection = dynamic(
  () => import("@/features/home/components/sections/community-section").then((mod) => mod.CommunitySection),
  {
    loading: () => <SectionSkeleton />,
  }
);

const RecommendedSection = dynamic(
  () => import("@/features/home/components/sections/recommended-section").then((mod) => mod.RecommendedSection),
  {
    loading: () => <SectionSkeleton />,
  }
);

function SectionSkeleton() {
  return (
    <div className="container mx-auto py-16 px-4 space-y-4">
      <Skeleton className="h-8 w-1/3 bg-muted" />
      <Skeleton className="h-4 w-2/3 bg-muted" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <HomeHeroSection />

      <UpcomingEventsSection />

      {/* <HomeStatsSection /> */}

      <CommunitySection />

      <RecommendedSection />

      {/* <CtaSection /> */}
    </main>
  );
}