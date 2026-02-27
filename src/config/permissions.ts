import { ROLES, UserRole } from '@/config/role'
import { ROUTES } from './routes'

export interface PermissionConfig {
  roles: readonly UserRole[]
}

const createConfig = (roles: readonly UserRole[]): PermissionConfig => ({
  roles,
})

// Define các nhóm quyền
const GROUPS = {
  ALL: [ROLES.ADMIN, ROLES.PARTICIPANT, ROLES.ORGANIZER] as const,
  ORGANIZER: [ROLES.ADMIN, ROLES.ORGANIZER] as const,
}

export const PERMISSION_MAP: Record<string, PermissionConfig> = {
  // --- PROTECTED ROUTES ---
  // Add protected routes here; routes not listed are treated as public.
  [ROUTES.HOME]: createConfig(GROUPS.ALL),
  [ROUTES.ORGANIZER_DASHBOARD]: createConfig(GROUPS.ORGANIZER),
}

// Pre-compute keys sort by length desc
const SORTED_PERMISSIONS_KEYS = Object.keys(PERMISSION_MAP).sort((a, b) => b.length - a.length)

export function getRouteConfig(pathname: string): PermissionConfig | null {
  if (PERMISSION_MAP[pathname]) return PERMISSION_MAP[pathname]

  const matchedKey = SORTED_PERMISSIONS_KEYS.find((key) => {
    if (!pathname.startsWith(key)) return false
    const nextChar = pathname[key.length]
    return nextChar === undefined || nextChar === '/'
  })

  return matchedKey ? PERMISSION_MAP[matchedKey] : null
}
