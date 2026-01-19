"use client";

import { Bell,CalendarFold, LogIn} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserName, getUserEmail, getUserAvatar, getUserRole, isAuthenticated } from "@/utils/authUtils";
import { ROUTES } from "@/config/routes";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Find Events", href: "#" },
  { label: "My Schedule", href: "#" },
  { label: "Organize", href: "#" },
];

export function HomeHeader() {
  const pathname = usePathname();
  const [userInfo, setUserInfo] = useState<{
    name: string | null;
    email: string | null;
    avatar: string | null;
    role: string | null;
    isAuthenticated: boolean;
  }>({
    name: null,
    email: null,
    avatar: null,
    role: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const updateUserInfo = () => {
      const authenticated = isAuthenticated();
      if (authenticated) {
        setUserInfo({
          name: getUserName(),
          email: getUserEmail(),
          avatar: getUserAvatar(),
          role: getUserRole(),
          isAuthenticated: true
        });
      } else {
        setUserInfo({
          name: null,
          email: null,
          avatar: null,
          role: null,
          isAuthenticated: false
        });
      }
    };

    updateUserInfo();

    // Listen for storage changes to update user info
    const handleStorageChange = () => updateUserInfo();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">

        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <CalendarFold className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            FEvents
          </span>
        </Link>

        {/* --- 2. NAVIGATION MENU --- */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive
                    ? "text-orange-500 font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* --- 3. USER ACTIONS --- */}
        <div className="flex items-center gap-4">

          {/* Notification Button - chỉ hiển thị khi đã đăng nhập */}
          {userInfo.isAuthenticated && (
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              <span className="sr-only">Notifications</span>
            </Button>
          )}

          {userInfo.isAuthenticated && <Separator orientation="vertical" className="h-8" />}

          <div className="flex items-center gap-3 pl-2">
            {userInfo.isAuthenticated ? (
              // --- ĐÃ ĐĂNG NHẬP ---
              <>
                <div className="hidden text-right text-sm sm:block">
                  <p className="font-bold leading-none">
                    {userInfo.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {userInfo.role ? userInfo.role.toUpperCase() : 'User'}
                  </p>
                </div>

                <Avatar className="h-9 w-9 border cursor-pointer hover:ring-2 hover:ring-orange-200 transition-all">
                  <AvatarImage
                    src={userInfo.avatar || "https://github.com/shadcn.png"}
                    alt={userInfo.name || 'User'}
                  />
                  <AvatarFallback>
                    {(userInfo.name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              // --- CHƯA ĐĂNG NHẬP ---
              <Link href={ROUTES.LOGIN}>
                <Button variant="outline" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default HomeHeader;