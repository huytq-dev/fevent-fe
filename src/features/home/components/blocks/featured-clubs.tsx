import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ClubProps {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  category: string;
  isPopular?: boolean;
}

// Mock data cho các CLB nổi bật
const FEATURED_CLUBS: ClubProps[] = [
  {
    id: "js-club",
    name: "JavaScript Club",
    description: "CLB lập trình Frontend với JavaScript, React, Node.js. Tổ chức workshop hàng tuần và hackathon.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000",
    members: 245,
    category: "Công nghệ",
    isPopular: true,
  },
  {
    id: "design-club",
    name: "FPT Design Club",
    description: "CLB thiết kế đồ họa, UI/UX. Học photoshop, figma, adobe creative suite và các công cụ thiết kế.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1000",
    members: 180,
    category: "Thiết kế",
    isPopular: true,
  },
  {
    id: "music-club",
    name: "Melody Music Club",
    description: "CLB âm nhạc với các ban nhạc, hòa tấu và biểu diễn live. Học guitar, piano, hát và sáng tác.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000",
    members: 320,
    category: "Âm nhạc",
    isPopular: true,
  },
  {
    id: "startup-club",
    name: "FPT Startup Club",
    description: "CLB khởi nghiệp với các dự án thực tế, pitch competition và mentorship từ cựu sinh viên thành công.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000",
    members: 150,
    category: "Khởi nghiệp",
  },
  {
    id: "english-club",
    name: "English Communication",
    description: "CLB Anh ngữ với TOEIC, IELTS preparation và giao tiếp tiếng Anh hàng ngày.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
    members: 400,
    category: "Ngôn ngữ",
  },
  {
    id: "sports-club",
    name: "FPT Sports Club",
    description: "CLB thể thao tổng hợp: bóng đá, bóng rổ, cầu lông, tennis và các hoạt động thể dục thể thao.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000",
    members: 280,
    category: "Thể thao",
  }
];

export function FeaturedClubs() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {FEATURED_CLUBS.map((club) => (
        <Card
          key={club.id}
          className="group overflow-hidden border-muted transition-all duration-300 hover:shadow-lg"
        >
          <div className="relative h-32 w-full overflow-hidden">
            <Image
              src={club.image}
              alt={club.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {club.isPopular && (
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  🔥 Hot
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="bg-background/80 text-foreground backdrop-blur text-xs"
              >
                {club.category}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <h3 className="mb-2 line-clamp-1 text-lg font-bold transition-colors group-hover:text-primary">
              <Link href={`/clubs/${club.id}`}>{club.name}</Link>
            </h3>

            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {club.description}
            </p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{club.members} thành viên</span>
              </div>

              <Link
                href={`/clubs/${club.id}`}
                className="text-sm font-medium text-primary transition-colors hover:text-primary"
              >
                Chi tiết →
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
