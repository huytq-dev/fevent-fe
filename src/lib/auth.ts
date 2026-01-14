import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import type { JWTPayload, User } from '@/types/auth'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
)

/**
 * ============================================
 * TOKEN VERIFICATION
 * ============================================
 */

/**
 * Verify JWT token (server-side)
 * @param token JWT token string
 * @returns Payload or null
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    if (!token) return null
    const verified = await jwtVerify(token, SECRET)
    return verified?.payload as any
  } catch (error) {
    console.error('❌ Token verification failed:', error)
    return null
  }
}

/**
 * ============================================
 * COOKIE MANAGEMENT
 * ============================================
 */

const TOKEN_NAMES = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
}

/**
 * Get access token from cookies
 */
export async function getAccessTokenCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get(TOKEN_NAMES.ACCESS)?.value || null
  } catch {
    return null
  }
}

/**
 * Get refresh token from cookies
 */
export async function getRefreshTokenCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get(TOKEN_NAMES.REFRESH)?.value || null
  } catch {
    return null
  }
}

/**
 * Set access token cookie
 */
export async function setAccessTokenCookie(token: string, maxAge?: number): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.set(TOKEN_NAMES.ACCESS, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: maxAge || 30 * 60, // 30 minutes
      path: '/',
    })
  } catch (error) {
    console.error('❌ Failed to set access token cookie:', error)
  }
}

/**
 * Set refresh token cookie (long-lived)
 */
export async function setRefreshTokenCookie(token: string): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.set(TOKEN_NAMES.REFRESH, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/api/auth/refresh',
    })
  } catch (error) {
    console.error('❌ Failed to set refresh token cookie:', error)
  }
}

/**
 * Clear all auth cookies
 */
export async function clearAuthCookies(): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(TOKEN_NAMES.ACCESS)
    cookieStore.delete(TOKEN_NAMES.REFRESH)
  } catch (error) {
    console.error('❌ Failed to clear cookies:', error)
  }
}

/**
 * ============================================
 * GET CURRENT USER
 * ============================================
 */

/**
 * Get current authenticated user
 * Returns null if not authenticated or token invalid
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = await getAccessTokenCookie()
    if (!token) return null

    const payload = await verifyToken(token)
    if (!payload) return null

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role as any,
      storeId: payload.storeId,
    }
  } catch (error) {
    console.error('❌ Failed to get current user:', error)
    return null
  }
}

/**
 * ============================================
 * AUTHORIZATION CHECKS
 * ============================================
 */

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Check if user has required role
 */
export async function hasRole(requiredRoles: string | string[]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user || !user.role) return false

  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
  return roles.includes(user.role)
}

/**
 * Check if user has all required roles
 */
export async function hasAllRoles(requiredRoles: string[]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false

  return requiredRoles.every((role) => user.role === role)
}

/**
 * ============================================
 * TOKEN UTILITIES
 * ============================================
 */

/**
 * Get token expiry time
 */
export async function getTokenExpiry(): Promise<number | null> {
  try {
    const token = await getAccessTokenCookie()
    if (!token) return null

    const payload = await verifyToken(token)
    return payload?.exp || null
  } catch {
    return null
  }
}

/**
 * Get time until token expires (in seconds)
 */
export async function getTimeUntilExpiry(): Promise<number | null> {
  try {
    const expiry = await getTokenExpiry()
    if (!expiry) return null

    const now = Math.floor(Date.now() / 1000)
    const timeLeft = expiry - now

    return timeLeft > 0 ? timeLeft : 0
  } catch {
    return null
  }
}
