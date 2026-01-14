import { stackMiddlewares } from '@/middlewares/stackHandler'
// import { withAuth } from '@/middlewares/withAuth'

// const middlewares = [withMaintenance, withAuth]

// export default stackMiddlewares(middlewares)

// Default proxy function - can add middlewares later
export default function proxy() {
  // Proxy logic here - for now just pass through
  // This can be enhanced with authentication, logging, etc.
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
