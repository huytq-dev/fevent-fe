import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { decodeJwt, JWTPayload } from 'jose'
import { MiddlewareFactory } from './stackHandler'
import { ROUTES } from '@/config/routes'
import { UserRole } from '@/config/role'
// Import helper trực tiếp từ file config để tránh code lặp và sai lệch logic
import { getRouteConfig } from '@/config/permissions'

// --- CONSTANTS ---
const MICROSOFT_ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

// Các trang chỉ dành cho khách (đã login thì không nên vào lại)
const GUEST_ONLY_ROUTES = new Set<string>([
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
])

// --- HELPERS ---
const getUserRole = (payload: JWTPayload): string => {
  const role = (payload[MICROSOFT_ROLE_CLAIM] as string) || (payload.role as string) || ''
  return role.toLowerCase()
}

const redirectToLogin = (request: NextRequest) => {
  const loginUrl = new URL(ROUTES.LOGIN, request.url)
  const response = NextResponse.redirect(loginUrl)
  response.cookies.delete('accessToken')
  return response
}

// --- MAIN MIDDLEWARE ---
export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl

    // 1. Bỏ qua file tĩnh và API nội bộ Next.js
    if (pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
      return next(request, _next)
    }

    const token = request.cookies.get('accessToken')?.value
    const routeConfig = getRouteConfig(pathname) // Dùng hàm import từ config
    
    // --- TRƯỜNG HỢP 1: ĐÃ CÓ TOKEN ---
    if (token) {
      try {
        const payload = decodeJwt(token)

        // Check hết hạn
        if (payload.exp && payload.exp < Date.now() / 1000) {
          throw new Error('TokenExpired')
        }

        // Logic chặn user đã login truy cập trang Guest (Login/Register/Forgot)
        if (GUEST_ONLY_ROUTES.has(pathname)) {
          return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
        }

        // Kiểm tra quyền (Role) đối với các trang Protected
        if (routeConfig) {
          const userRole = getUserRole(payload)
          // Ép kiểu userRole về UserRole để so sánh
          const hasAccess = routeConfig.roles.includes(userRole as UserRole)

          if (!hasAccess) {
            console.warn(`[403] User: ${userRole} denied access to ${pathname}`)
            return NextResponse.redirect(new URL(ROUTES.FORBIDDEN || '/403', request.url))
          }
        }

        // Token hợp lệ + Role hợp lệ (hoặc trang public) -> Cho qua
        return next(request, _next)

      } catch (error) {
        // Token lỗi -> Xử lý như chưa login
        return redirectToLogin(request)
      }
    }

    // --- TRƯỜNG HỢP 2: CHƯA CÓ TOKEN ---
    
    // Nếu route có config -> Bắt buộc login
    if (routeConfig) {
      return redirectToLogin(request)
    }

    // Các trường hợp còn lại (Trang public, hoặc trang 404 chưa define) -> Cho qua
    return next(request, _next)
  }
}
