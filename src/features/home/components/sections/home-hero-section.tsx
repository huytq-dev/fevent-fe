import { HomeHero } from "../blocks/home-hero";
import { HomeSearch } from "../blocks/home-search";

export function HomeHeroSection() {
  return (
    <section className="relative flex flex-col items-center">
      <HomeHero />
      <div className="container relative z-20 -mt-12 px-4 md:px-6">
        <HomeSearch />
      </div>
    </section>
  );
}