export const ROLES = {
    ORGANIZER: 'organizer',
    PARTICIPANT: 'participant',
    ADMIN: 'admin',
  } as const
  
  export type UserRole = (typeof ROLES)[keyof typeof ROLES]
  
  export const ROLE_VALUES = Object.values(ROLES) as [UserRole, ...UserRole[]]
  