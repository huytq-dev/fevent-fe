export const ROLE_CLAIM_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

export const ROLE_REDIRECTS: Record<string, string> = {
  participant: '/home',
  organizer: '/organizer',
  admin: '/home',
}
