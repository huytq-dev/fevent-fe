import { HomeHeader } from "@/features/home/components/layout/home-header";
import { HomeFooter } from "@/features/home/components/layout/home-footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <HomeHeader />

      <main className="flex-1 w-full">
        {children}
      </main>

      <HomeFooter />
    </div>
  );
}