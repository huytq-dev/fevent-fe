'use client'

import { ROUTES } from '@/config/routes'
import type { CustomJwtPayload, User } from '@/types/auth'
import { useRouter, usePathname } from 'next/navigation' // [NEW] Thêm usePathname
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'

import { ROLE_CLAIM_KEY, ROLE_REDIRECTS } from '@/config/authConfig'
import { LoginInput } from '@/features/auth/auth.schema'
import authService from '@/features/auth/services/AuthService'
import {
  clearAuthData,
  decodeToken,
  getAuthToken,
  getTokenExpiresIn,
  saveAuthToken,
  saveUserDataFromToken,
} from '@/utils/authUtils'

// --- TYPES ---
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean
  login: (credentials: LoginInput, expectedRole?: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// --- PROVIDER ---
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname() // [NEW] Lấy đường dẫn hiện tại
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Dùng Ref để tránh re-create hàm không cần thiết
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // --- HELPER: Parse User ---
  const parseUserFromToken = useCallback((token: string | null): User | null => {
    if (!token) return null
    try {
      const decoded = decodeToken(token)
      if (!decoded) return null
      
      const rawRole =
        (ROLE_CLAIM_KEY ? decoded[ROLE_CLAIM_KEY as keyof CustomJwtPayload] : undefined) ||
        decoded.role ||
        ''

      return {
        id: decoded.sub || decoded.id || null,
        email: decoded.email || null,
        name: decoded.name || null,
        role: String(rawRole).toLowerCase(),
        avatarUrl: decoded.avatar || decoded.picture || null,
      }
    } catch {
      return null
    }
  }, [])

  // --- CORE ACTIONS ---

  const clearTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
      refreshTimerRef.current = null
    }
  }, [])

  // [FIX 1] Logic Logout an toàn - Chặn vòng lặp redirect
  const logout = useCallback(() => {
    clearTimer()
    clearAuthData()
    setUser(null)
    
    // Chỉ redirect nếu KHÔNG PHẢI đang ở trang login
    // Điều này ngăn chặn việc trang Login gọi logout -> reload lại trang Login -> loop
    if (pathname !== ROUTES.LOGIN) {
      router.push(ROUTES.LOGIN)
      toast.info('Đã đăng xuất')
    }
  }, [router, pathname, clearTimer]) // Thêm pathname vào dependency

  const performTokenRefresh = useCallback(async () => {
    try {
      const response = await authService.refreshTokenAPI()

      if (response.isSuccess && response.data?.accessToken) {
        const accessToken = response.data.accessToken
        saveAuthToken(accessToken)
        
        const decoded = decodeToken(accessToken)
        if (decoded) {
          saveUserDataFromToken(decoded)
          setUser(parseUserFromToken(accessToken)) 
        }
        return true
      }
      return false
    } catch (error: any) {
      console.error('Refresh failed:', error)
      
      const status = error?.response?.status || error?.status;
      
      // [FIX 2] Phân biệt 401 và 403
      // 401: Unauthorized (Token hết hạn/sai) -> BẮT BUỘC Logout
      if (status === 401) {
         logout()
      } 
      // 403: Forbidden (Token đúng nhưng bị cấm truy cập resource này)
      // -> KHÔNG logout ngay, vì user vẫn đang login hợp lệ, chỉ là không được quyền làm việc này thôi.
      // -> Trừ khi API refresh trả về 403 (Refresh token bị blacklist) thì mới logout.
      else if (status === 403) {
         // Tùy logic backend, nếu backend trả 403 cho refresh token thì logout.
         // Nhưng nên cẩn thận log ra để debug.
         console.warn('Refresh token forbidden')
         logout()
      }
      
      return false
    }
  }, [parseUserFromToken, logout])

  const login = useCallback(
    async (credentials: LoginInput, expectedRole?: string) => {
      try {
        const response = await authService.loginAPI(credentials)
        
        if (!response.isSuccess || !response.data?.accessToken) {
          throw new Error(response.message || 'Đăng nhập thất bại')
        }

        const accessToken = response.data.accessToken
        const decoded = decodeToken(accessToken)
        if (!decoded) throw new Error('Invalid token format')

        saveAuthToken(accessToken)
        saveUserDataFromToken(decoded)

        const currentUser = parseUserFromToken(accessToken)
        if (!currentUser) throw new Error('Cannot parse user')

        const requiredRole = expectedRole?.toLowerCase()
        if (requiredRole && currentUser.role !== requiredRole) {
          throw new Error('Bạn không có quyền truy cập.')
        }

        setUser(currentUser)
        toast.success('Đăng nhập thành công')

        const redirectPath = ROLE_REDIRECTS[currentUser.role || ''] || ROUTES.LOGIN
        router.push(redirectPath)
      } catch (err: any) {
        // Login thất bại thì clean hết
        clearAuthData()
        setUser(null)
        throw err
      }
    },
    [router, parseUserFromToken],
  )

  // --- EFFECTS ---

  // 1. Auto Refresh Logic
  useEffect(() => {
    clearTimer()
    if (!user) return

    const expiresIn = getTokenExpiresIn()
    // Nếu expires < 0 (hết hạn), delay = 0 để gọi ngay
    const delay = expiresIn < 2 * 60 * 1000 ? 0 : expiresIn - 2 * 60 * 1000 

    refreshTimerRef.current = setTimeout(() => {
      performTokenRefresh()
    }, Math.max(0, delay))

    return () => clearTimer()
  }, [user, performTokenRefresh, clearTimer]) // user thay đổi thì reset timer

  // 2. Initialization
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken()
      if (!token) {
        setIsInitialized(true)
        return
      }

      const expiresIn = getTokenExpiresIn()
      // [FIX 3] Nếu token chưa hết hạn thì set User luôn, không gọi refresh thừa thãi
      if (expiresIn > 0) {
        const usr = parseUserFromToken(token)
        if (usr) {
            setUser(usr)
        } else {
            // Token rác -> clear
            clearAuthData()
        }
      } else {
        // Chỉ refresh khi thực sự hết hạn
        const success = await performTokenRefresh()
        if (!success) {
           clearAuthData()
           setUser(null)
        }
      }
      setIsInitialized(true)
    }
    
    initAuth()
  }, []) 

  // 3. Sync Tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        if (!e.newValue) {
          setUser(null)
          clearTimer()
          // [FIX 4] Check pathname trước khi push ở sự kiện storage
          if (window.location.pathname !== ROUTES.LOGIN) {
             router.push(ROUTES.LOGIN)
          }
        } else {
          setUser(parseUserFromToken(e.newValue))
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [parseUserFromToken, clearTimer, router]) // Bỏ pathname ra khỏi dependency của effect này để tránh re-bind liên tục

  // 4. Listen for global logout event (from axios) to avoid hard reload loops
  useEffect(() => {
    const handleAuthLogout = () => {
      clearTimer()
      clearAuthData()
      setUser(null)
      if (window.location.pathname !== ROUTES.LOGIN) {
        router.replace(ROUTES.LOGIN)
      }
    }

    window.addEventListener('auth:logout', handleAuthLogout)
    return () => window.removeEventListener('auth:logout', handleAuthLogout)
  }, [router, clearTimer])

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user,
      isInitialized,
      login,
      logout,
      refreshToken: performTokenRefresh,
    }),
    [user, isInitialized, login, logout, performTokenRefresh],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
