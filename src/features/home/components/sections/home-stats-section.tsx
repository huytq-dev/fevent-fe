import { HomeStats } from "../blocks/home-stats";

export function HomeStatsSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <HomeStats />
      </div>
    </section>
  );
}
