"use client";

import {
  Bell,
  CalendarFold,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MenuButton } from "@/components/common/menu-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ROUTES } from "@/config/routes";
import { getUserAvatar, getUserEmail, getUserName, getUserRole, isAuthenticated, getUserId } from "@/utils/authUtils";
import type { User } from "@/types/auth";

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Tìm sự kiện", href: "/events" },
  { label: "Clubs", href: "/clubs" },
  { label: "Lịch của tôi", href: "/schedule" },
];

export function HomeHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<{
    id: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null;
    role: string | null;
    isAuthenticated: boolean;
  }>({
    id: null,
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
          id: getUserId(),
          name: getUserName(),
          email: getUserEmail(),
          avatar: getUserAvatar(),
          role: getUserRole(),
          isAuthenticated: true,
        });
      } else {
        setUserInfo({
          id: null,
          name: null,
          email: null,
          avatar: null,
          role: null,
          isAuthenticated: false,
        });
      }
    };

    updateUserInfo();
    const handleStorageChange = () => updateUserInfo();
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateUserInfo();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", updateUserInfo);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", updateUserInfo);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // --- Hàm xử lý Đăng xuất ---
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUserInfo({
      id: null,
      name: null,
      email: null,
      avatar: null,
      role: null,
      isAuthenticated: false,
    });

    router.push(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-16 px-4 md:px-6">
        <div className="flex h-full items-center">

          {/* LEFT */}
          <div className="flex flex-1 items-center">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CalendarFold className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">FEvents</span>
            </Link>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary font-bold" : "text-muted-foreground"
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex flex-1 items-center justify-end gap-4">
            {userInfo.isAuthenticated && (
              <>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
                  <span className="sr-only">Notifications</span>
                </Button>

                <Separator orientation="vertical" className="h-8" />
              </>
            )}

            {/* User area */}
            <div className="flex items-center gap-3">
              {userInfo.isAuthenticated ? (
                <>
                  <div className="hidden text-right text-sm sm:block">
                    <p className="font-bold leading-none">{userInfo.name || "User"}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {userInfo.role ? userInfo.role.toUpperCase() : "USER"}
                    </p>
                  </div>

                  <MenuButton
                    user={userInfo.isAuthenticated ? {
                      id: userInfo.id,
                      name: userInfo.name,
                      email: userInfo.email,
                      role: userInfo.role
                    } as User : undefined}
                    logout={handleLogout}
                  />
                </>
              ) : (
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
      </div>
    </header>
  );
}

