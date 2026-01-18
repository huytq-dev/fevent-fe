'use client'

import { Eye, EyeOff, LogIn, LogOut, ShieldCheck, Terminal, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/config/routes'

// Auth Utils
import {
  clearAuthData,
  getAuthToken,
  getTokenExpiresIn,
  getUserAvatar,
  getUserEmail,
  getUserName,
  getUserRole,
  isAuthenticated
} from '@/utils/authUtils'

export default function HomePage() {
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<{
    name: string | null
    email: string | null
    role: string | null
    avatar: string | null
    expiresIn: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showToken, setShowToken] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated()
      const accessToken = getAuthToken()

      setIsLoggedIn(authenticated)

      if (authenticated && accessToken) {
        setToken(accessToken)
        setUserInfo({
          name: getUserName(),
          email: getUserEmail(),
          role: getUserRole(),
          avatar: getUserAvatar(),
          expiresIn: getTokenExpiresIn()
        })
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = () => {
    clearAuthData()
    setIsLoggedIn(false)
    setToken(null)
    setUserInfo(null)
    router.refresh()
  }

  const formatExpiresIn = (ms: number) => {
    if (ms <= 0) return 'Đã hết hạn'

    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours} giờ ${minutes} phút`
    }
    return `${minutes} phút`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4">

      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            FEvents Testing Ground
          </h1>
          <p className="text-muted-foreground text-lg">
            Trang kiểm tra trạng thái xác thực (Authentication State)
          </p>
        </div>

        {/* Auth Status Card */}
        <Card className="w-full shadow-lg border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Trạng thái Authentication
            </CardTitle>
            <CardDescription>
              Kiểm tra trạng thái đăng nhập và thông tin Access Token.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="h-20 flex items-center justify-center text-muted-foreground">
                Đang tải trạng thái...
              </div>
            ) : isLoggedIn && userInfo ? (
              // --- GIAO DIỆN KHI ĐÃ ĐĂNG NHẬP ---
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Thông tin User */}
                <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-100 text-green-700">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Đã đăng nhập</h3>
                    <p className="text-sm opacity-90">
                      Xin chào, {userInfo.name || 'User'}!
                    </p>
                    <div className="mt-1 text-xs opacity-75">
                      <span className="font-medium">{userInfo.email}</span>
                      {userInfo.role && <span className="ml-2 px-2 py-1 rounded bg-green-200 text-green-800">{userInfo.role.toUpperCase()}</span>}
                    </div>
                  </div>
                </div>

                {/* Thông tin Token */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        Token Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Trạng thái:</span>
                          <span className="font-medium text-green-600">Hoạt động</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hết hạn trong:</span>
                          <span className="font-medium">{formatExpiresIn(userInfo.expiresIn)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Token Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="relative">
                        <div className={`p-3 rounded-md bg-slate-950 text-slate-50 font-mono text-xs break-all max-h-20 overflow-hidden ${showToken ? '' : 'blur-sm'}`}>
                          {token}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0"
                          onClick={() => setShowToken(!showToken)}
                        >
                          {showToken ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              // --- GIAO DIỆN KHI CHƯA ĐĂNG NHẬP ---
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-lg bg-muted/50 border border-dashed">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Chưa xác thực</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bạn chưa đăng nhập hoặc token đã hết hạn.
                  </p>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-end gap-3 bg-muted/10 p-6">
            {isLoggedIn ? (
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Button>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button>Đăng ký ngay</Button>
                </Link>
              </>
            )}
          </CardFooter>
        </Card>

        {/* Test API Call Section */}
        {isLoggedIn && (
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle>Test API Call</CardTitle>
              <CardDescription>
                Test gọi API với token hiện tại
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bạn có thể test các API khác bằng cách sử dụng token này trong Authorization header.
              </p>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  )
}