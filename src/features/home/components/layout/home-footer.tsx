"use client";

import { 
  CalendarFold, 
  Facebook, 
  Github, 
  Instagram, 
  Linkedin, 
  Mail, 
  Twitter 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// --- DỮ LIỆU CẤU HÌNH (Có thể tách ra file config riêng) ---
const FOOTER_LINKS = [
  {
    title: "Sản phẩm",
    links: [
      { label: "Tìm sự kiện", href: "#" },
      { label: "Tạo sự kiện", href: "#" },
      { label: "Bảng giá", href: "#" },
      { label: "Tính năng", href: "#" },
    ],
  },
  {
    title: "Tài nguyên",
    links: [
      { label: "Trung tâm hỗ trợ", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Cộng đồng", href: "#" },
      { label: "Dành cho Developer", href: "#" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { label: "Về chúng tôi", href: "#" },
      { label: "Tuyển dụng", href: "#" },
      { label: "Điều khoản", href: "#" },
      { label: "Liên hệ", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function HomeFooter() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-12 md:pt-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* --- PHẦN CHÍNH: LOGO, NEWSLETTER & LINKS --- */}
        <div className="grid gap-8 xl:grid-cols-3 lg:grid-cols-12 md:grid-cols-1 mb-12">
          
          {/* 1. Brand & Newsletter (Chiếm không gian lớn bên trái trên màn hình lớn) */}
          <div className="flex flex-col gap-6 lg:col-span-4 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CalendarFold className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                FEvents
              </span>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Nền tảng kết nối đam mê và sẻ chia khoảnh khắc. Tạo và tham gia sự kiện dễ dàng hơn bao giờ hết.
            </p>

            <div className="flex flex-col gap-3 max-w-sm">
              <h4 className="font-semibold text-sm">Đăng ký nhận tin tức mới</h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  placeholder="Email của bạn..." 
                  type="email" 
                  className="bg-muted/50 focus-visible:ring-primary"
                />
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </form>
            </div>
          </div>

          {/* 2. Links Columns (Chiếm phần còn lại) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-8 xl:col-span-2 xl:pl-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h4 className="font-bold text-foreground tracking-wide">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary hover:font-medium transition-all"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* --- PHẦN CUỐI: COPYRIGHT & SOCIAL --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 pt-2">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} FEvents Inc. Bảo lưu mọi quyền.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default HomeFooter;
