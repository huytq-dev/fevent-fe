import { stackMiddlewares } from '@/middlewares/stackHandler'
import { withAuth } from '@/middlewares/withAuth'

const middlewares = [withAuth]

export default stackMiddlewares(middlewares)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
