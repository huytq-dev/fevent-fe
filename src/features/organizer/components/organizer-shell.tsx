"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarPlus,
  LayoutDashboard,
  QrCode,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/config/routes"

const NAV_ITEMS = [
  {
    label: "Tổng quan",
    href: ROUTES.ORGANIZER_DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Tạo sự kiện",
    href: ROUTES.ORGANIZER_CREATE_EVENT,
    icon: CalendarPlus,
  },
  {
    label: "Check-in QR",
    href: ROUTES.ORGANIZER_CHECK_IN,
    icon: QrCode,
  },
  {
    label: "Danh sách người tham gia",
    href: ROUTES.ORGANIZER_PARTICIPANTS,
    icon: Users,
  },
]

export function OrganizerShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader className="flex items-center gap-3 px-3 py-4">
          <Link href={ROUTES.ORGANIZER_DASHBOARD} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Organizer</p>
              <p className="text-xs text-muted-foreground">FEvents Studio</p>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Quản lý</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === ROUTES.ORGANIZER_DASHBOARD
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3">
          <Button variant="secondary" className="w-full justify-start">
            <span className="text-xs text-muted-foreground">Hỗ trợ: support@fevents.vn</span>
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b bg-background/95 px-4">
          <SidebarTrigger />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Organizer Console</p>
              <h1 className="text-lg font-semibold">Quản trị sự kiện</h1>
            </div>
            <Button variant="outline" asChild>
              <Link href={ROUTES.ORGANIZER_CREATE_EVENT}>Tạo sự kiện</Link>
            </Button>
          </div>
        </header>
        <main className="min-h-[calc(100vh-4rem)] bg-muted/30 px-6 py-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
