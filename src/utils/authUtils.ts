import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import type { CustomJwtPayload } from '@/types/auth'

const TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_ID_KEY = 'userId'
const USER_EMAIL_KEY = 'userEmail'
const USER_NAME_KEY = 'userName'
const USER_ROLE_KEY = 'userRole'
const USER_AVATAR_KEY = 'userAvatar'

export const decodeToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode<CustomJwtPayload>(token)
  } catch {
    return null
  }
}

export const saveAuthToken = (token: string | null): boolean => {
  if (!token) {
    console.warn('[authUtils] Token invalid')
    return false
  }

  try {
    const decoded = decodeToken(token)
    if (!decoded) {
      console.warn('[authUtils] Token decode failed')
      return false
    }

    localStorage.setItem(TOKEN_KEY, token)

    const cookieOptions: Cookies.CookieAttributes = {
      path: '/',
      sameSite: 'strict',
    }

    if (decoded.exp) {
      cookieOptions.expires = new Date(decoded.exp * 1000)
    } else {
      cookieOptions.expires = 1
    }

    Cookies.set(TOKEN_KEY, token, cookieOptions)

    return true
  } catch (error) {
    console.error('[authUtils] Save token failed:', error)
    return false
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export const saveRefreshToken = (token: string | null): boolean => {
  if (!token) return false
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
    return true
  } catch (error) {
    console.error('[authUtils] Save refresh token failed:', error)
    return false
  }
}

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const saveUserDataFromToken = (decodedToken: CustomJwtPayload): boolean => {
  try {
    const userId = decodedToken.Id || decodedToken.sub || decodedToken.id || ''

    const email =
      decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
      decodedToken.email ||
      ''

    const name =
      decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
      decodedToken.name ||
      ''

    const role =
      String(
        decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
          decodedToken.role ||
          '',
      ).toLowerCase()

    const avatarUrl = decodedToken.avatarUrl || decodedToken.avatar || decodedToken.picture || ''

    if (userId) localStorage.setItem(USER_ID_KEY, userId)
    if (email) localStorage.setItem(USER_EMAIL_KEY, email)
    if (name) localStorage.setItem(USER_NAME_KEY, name)
    if (role) localStorage.setItem(USER_ROLE_KEY, role)
    if (avatarUrl) localStorage.setItem(USER_AVATAR_KEY, avatarUrl)

    return true
  } catch (error) {
    console.error('[authUtils] Save user data failed:', error)
    return false
  }
}

export const saveUserDataFromTokenString = (token: string): boolean => {
  const decoded = decodeToken(token)
  if (!decoded) return false
  return saveUserDataFromToken(decoded)
}

export const getUserId = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(USER_ID_KEY)
export const getUserEmail = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(USER_EMAIL_KEY)
export const getUserName = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(USER_NAME_KEY)
export const getUserRole = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(USER_ROLE_KEY)
export const getUserAvatar = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(USER_AVATAR_KEY)

export const isTokenValid = (): boolean => {
  const token = getAuthToken()
  if (!token) return false

  const decoded = decodeToken(token)
  if (!decoded?.exp) return false

  const now = Date.now() / 1000
  return decoded.exp > now
}

export const getTokenExpiresIn = (): number => {
  const token = getAuthToken()
  if (!token) return 0

  const decoded = decodeToken(token)
  if (!decoded?.exp) return 0

  const now = Date.now() / 1000
  const expiresIn = (decoded.exp - now) * 1000
  return expiresIn > 0 ? expiresIn : 0
}

export const clearAuthData = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_ID_KEY)
    localStorage.removeItem(USER_EMAIL_KEY)
    localStorage.removeItem(USER_NAME_KEY)
    localStorage.removeItem(USER_ROLE_KEY)
    localStorage.removeItem(USER_AVATAR_KEY)

    Cookies.remove(TOKEN_KEY, { path: '/' })
  } catch (error) {
    console.error('[authUtils] Clear auth data failed:', error)
  }
}

export const isAuthenticated = (): boolean => {
  return !!getAuthToken() && isTokenValid()
}

export const getAuthState = () => {
  return {
    isAuthenticated: isAuthenticated(),
    token: getAuthToken(),
    refreshToken: getRefreshToken(),
    userId: getUserId(),
    email: getUserEmail(),
    name: getUserName(),
    role: getUserRole(),
    avatarUrl: getUserAvatar(),
    expiresIn: getTokenExpiresIn(),
  }
}
