import { HomeHeader } from "@/features/home/components/home-header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header nằm trên cùng */}
      <HomeHeader />

      {/* Main content sẽ co giãn để đẩy Footer xuống đáy nếu nội dung ngắn */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer nằm dưới cùng */}
      {/* <Footer /> */}
    </div>
  );
}