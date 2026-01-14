import { UserRole } from '@/config/role'

/**
 * USER TYPES
 */
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  storeId?: string
  createdAt?: string
}

export interface JWTPayload {
  id: string
  email: string
  name: string
  role: string
  storeId?: string
  iat: number
  exp: number
}

/**
 * API RESPONSE TYPES
 */
export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  accessToken?: string
  refreshToken?: string
}

export interface ApiErrorResponse {
  success: false
  message: string
  code?: string
  details?: Record<string, unknown>
}

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name?: string
    role?: string
  }
  accessToken?: string
  refreshToken?: string
  errors?: Record<string, string[]>
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}
