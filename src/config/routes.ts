export const ROUTES = {
  // Public routes
  // Errors
  FORBIDDEN: '/forbidden',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/not-found',
  
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  REFRESH_TOKEN: '/refresh-token',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  GOOGLE_LOGIN: '/google',
  GOOGLE_CALLBACK: '/google/callback',

  // Protected routes
  // Trang chính
  HOME: '/home',
  PROFILE: '/profile',
  EVENTS: '/events',
} as const