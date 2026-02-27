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

  // Organizer routes
  ORGANIZER_DASHBOARD: '/organizer',
  ORGANIZER_EVENTS: '/organizer/events',
  ORGANIZER_CREATE_EVENT: '/organizer/events/new',
  ORGANIZER_CHECK_IN: '/organizer/check-in',
  ORGANIZER_PARTICIPANTS: '/organizer/participants',
} as const
