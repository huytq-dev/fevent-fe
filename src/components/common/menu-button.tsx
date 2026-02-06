'use client'

import { useTheme } from 'next-themes'
import {
  EllipsisVertical,
  Sun,
  Moon,
  Monitor,
  LogOut,
  User as UserIcon,
  Settings,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { Skeleton } from '@/components/ui/skeleton'
import type { User } from '@/types/auth'

interface MenuButtonProps {
  user?: User | null
  logout?: () => void
}

export function MenuButton({ user, logout }: MenuButtonProps) {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full ml-1" disabled>
        <Skeleton className="h-8 w-8 rounded-full" />
      </Button>
    )
  }

  const themes = [
    { value: 'light', label: 'Sáng', icon: Sun },
    { value: 'dark', label: 'Tối', icon: Moon },
    { value: 'system', label: 'Hệ thống', icon: Monitor },
  ]

  return (
    <DropdownMenu>
      <div className="flex items-center gap-2">
        {user && (
          <Link href="/profile" className="rounded-full" aria-label="Go to profile">
            <Avatar className="h-8 w-8 border cursor-pointer transition-opacity hover:opacity-80">
              <AvatarImage
                src={user.avatarUrl || 'https://github.com/shadcn.png'}
                alt={user.name || 'User'}
              />
              <AvatarFallback>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </Link>
        )}

        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full ml-1">
            <EllipsisVertical className="h-5 w-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        {user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer w-full">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Hồ sơ cá nhân</span>
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Cài đặt</span>
                </Link>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="mr-2 h-4 w-4" />
            <span>Giao diện</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {themes.map(({ value, label, icon: Icon }) => (
              <DropdownMenuItem
                key={value}
                onClick={() => setTheme(value)}
                className="cursor-pointer"
              >
                <Icon className={`mr-2 h-4 w-4 ${theme === value ? 'text-orange-500' : ''}`} />
                <span className={theme === value ? 'font-bold' : ''}>{label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {user && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer"
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