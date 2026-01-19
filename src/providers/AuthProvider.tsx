'use client'

import { ROUTES } from '@/config/routes'
import type { CustomJwtPayload, User } from '@/types/auth'
import { useRouter } from 'next/navigation'
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
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // --- HELPER: Pure function to parse User ---
  // (Giữ nguyên logic cũ nhưng có thể tối ưu nếu decodeToken trả về đúng type)
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

  const logout = useCallback(() => {
    clearTimer()
    clearAuthData()
    setUser(null)
    router.push(ROUTES.LOGIN)
    toast.info('Đã đăng xuất')
  }, [router, clearTimer])

  // [FIX] Logic Refresh Token thông minh hơn
  const performTokenRefresh = useCallback(async () => {
    try {
      // Nếu dùng HttpOnly Cookie thì không cần check getRefreshToken() ở đây
      // Nếu dùng LocalStorage cho RefreshToken thì mới cần check.
      // Giả sử backend dùng Cookie -> cứ gọi API thử.
      
      const response = await authService.refreshTokenAPI()

      if (response.isSuccess && response.data?.accessToken) {
        const accessToken = response.data.accessToken
        
        saveAuthToken(accessToken)
        
        // [FIX] Tối ưu: Decode 1 lần dùng cho cả 2 việc
        const decoded = decodeToken(accessToken)
        if (decoded) {
          saveUserDataFromToken(decoded)
          // Tái sử dụng decoded data để set User state luôn, đỡ gọi parseUserFromToken lại
          // (Hoặc gọi lại cũng được, nhưng logic decodeToken ở trên đã an toàn)
          setUser(parseUserFromToken(accessToken)) 
        }

        return true
      }
      return false
    } catch (error: any) {
      console.error('Refresh failed:', error)
      
      // [FIX] QUAN TRỌNG: Chỉ Logout nếu lỗi là 401 (Unauthorized) hoặc 403 (Forbidden)
      // Nếu lỗi mạng (Network Error) hoặc 500 -> KHÔNG Logout, để user thử lại sau.
      const status = error?.response?.status || error?.status;
      if (status === 401 || status === 403) {
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
        
        // [FIX] Double Decode: Decode 1 lần ở đây
        const decoded = decodeToken(accessToken)
        if (!decoded) throw new Error('Invalid token format')

        // 1. Lưu token
        saveAuthToken(accessToken)
        // 2. Lưu user info phụ (nếu cần)
        saveUserDataFromToken(decoded)

        // 3. Parse user từ token (Hoặc build object User trực tiếp từ biến decoded ở trên cho nhanh)
        const currentUser = parseUserFromToken(accessToken)
        if (!currentUser) throw new Error('Cannot parse user')

        // 4. Check Role
        const requiredRole = expectedRole?.toLowerCase()
        if (requiredRole && currentUser.role !== requiredRole) {
          throw new Error('Bạn không có quyền truy cập.')
        }

        setUser(currentUser)
        toast.success('Đăng nhập thành công')

        const redirectPath = ROLE_REDIRECTS[currentUser.role || ''] || ROUTES.LOGIN
        router.push(redirectPath)
      } catch (err) {
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
    // Nếu token hết hạn hoặc sắp hết hạn (< 2 phút) -> refresh
    // [Lưu ý] Nếu expiresIn < 0 (đã hết hạn), set delay = 0 để refresh ngay
    const shouldRefreshImmediately = expiresIn < 2 * 60 * 1000 
    const delay = shouldRefreshImmediately ? 0 : expiresIn - 2 * 60 * 1000 

    refreshTimerRef.current = setTimeout(() => {
      performTokenRefresh()
    }, Math.max(0, delay)) // Đảm bảo delay không âm

    return () => clearTimer()
  }, [user, performTokenRefresh, clearTimer])

  // 2. Initialization
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken()
      if (!token) {
        setIsInitialized(true)
        return
      }

      const expiresIn = getTokenExpiresIn()
      if (expiresIn > 0) {
        setUser(parseUserFromToken(token))
      } else {
        const success = await performTokenRefresh()
        if (!success) {
           clearAuthData()
           setUser(null)
        }
      }
      setIsInitialized(true)
    }
    initAuth()
  }, [parseUserFromToken, performTokenRefresh])

  // 3. Sync Tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        if (!e.newValue) {
          setUser(null)
          clearTimer()
          router.push(ROUTES.LOGIN)
        } else {
          setUser(parseUserFromToken(e.newValue))
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [parseUserFromToken, clearTimer, router])

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