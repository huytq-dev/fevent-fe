'use client'
import { useTheme } from 'next-themes'
import {
  EllipsisVertical,
  Sun,
  SunIcon,
  MoonIcon,
  MonitorCog,
  LogOut,
  UserIcon,
  Settings,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function MenuButton({ user, logout }: { user?: any; logout?: () => void }) {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const themes = [
    { value: 'light', label: 'Sáng', icon: <SunIcon /> },
    { value: 'dark', label: 'Tối', icon: <MoonIcon /> },
    { value: 'system', label: 'Hệ thống', icon: <MonitorCog /> },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={'/'} alt={'xx'} />
              <AvatarFallback>{'x'}</AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Hồ sơ cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="mr-2 h-4 w-4" />
            <span>Giao diện</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {themes.map((themeOption) => (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className={theme === themeOption.value ? 'bg-accent' : ''}
              >
                {themeOption.icon}
                <span className={theme === themeOption.value ? 'font-semibold' : ''}>
                  {themeOption.label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {user && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Đăng xuất</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
