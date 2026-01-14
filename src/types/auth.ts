import { UserRole } from '@/config/role'
import type { JwtPayload } from 'jwt-decode'

export interface User {
  id: string | null
  email: string | null
  name: string | null
  role: UserRole | string | null
  avatarUrl?: string | null
  storeId?: string | null
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

export interface CustomJwtPayload extends JwtPayload {
  id?: string
  Id?: string
  email?: string
  name?: string
  role?: string
  avatar?: string
  avatarUrl?: string
  picture?: string

  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string
}
