'use client'

import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useRef,
} from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ROUTES } from '@/config/routes'
import type { User, CustomJwtPayload } from '@/types/auth'

import {
  getAuthToken,
  getRefreshToken,
  saveAuthToken,
  saveRefreshToken,
  saveUserDataFromToken,
  clearAuthData,
  getTokenExpiresIn,
  decodeToken,
} from '@/utils/authUtils'
import authService from '@/features/auth/services/AuthService'
import { LoginInput } from '@/features/auth/auth.schema'
import { ROLE_CLAIM_KEY, ROLE_REDIRECTS } from '@/config/authConfig'

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
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  // --- HELPER: Pure function to parse User ---
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

  const performTokenRefresh = useCallback(async () => {
    try {
      const oldRefreshToken = getRefreshToken()
      if (!oldRefreshToken) throw new Error('No refresh token')

      const response = await authService.refreshTokenAPI()

      if (response.isSuccess && response.data?.accessToken) {
        const accessToken = response.data.accessToken
        
        saveAuthToken(accessToken)
        const decoded = decodeToken(accessToken)
        if (!decoded) throw new Error('Invalid token format')
        saveUserDataFromToken(decoded)

        setUser(parseUserFromToken(accessToken))
        
        // RefreshToken được gửi qua cookie từ backend, không cần lưu từ response
        return true
      }
      return false
    } catch (error) {
      console.error('Refresh failed:', error)
      logout()
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
        const currentUser = parseUserFromToken(accessToken)
        if (!currentUser) throw new Error('Invalid token format')

        const requiredRole = expectedRole?.toLowerCase()
        if (requiredRole && currentUser.role !== requiredRole) {
          throw new Error('Bạn không có quyền truy cập.')
        }

        saveAuthToken(accessToken)
        // RefreshToken được gửi qua cookie từ backend, không cần lưu từ response

        const decoded = decodeToken(accessToken)
        if (!decoded) throw new Error('Invalid token format')
        saveUserDataFromToken(decoded)

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
    const shouldRefreshImmediately = expiresIn < 2 * 60 * 1000 // < 2 mins
    const delay = shouldRefreshImmediately ? 1000 : expiresIn - 2 * 60 * 1000

    refreshTimerRef.current = setTimeout(() => {
      performTokenRefresh()
    }, delay)

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
        if (!success) setUser(null)
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
