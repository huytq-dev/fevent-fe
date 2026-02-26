export interface UserProfile {
  id: string
  name: string
  studentId: string
  status: "Active Student" | "Inactive"
  major: string
  email: string
  campus: string
  academicYear: string
  dob: string
  phone: string
  avatar: string
  coverImage?: string
  address?: string; 
  gender?: "Nam" | "Nữ" | "Khác" | string;
  socialLinks?: Array<{ platform: number; url: string }>
  socials: {
    linkedin?: string
    github?: string
    facebook?: string
  }
  stats: {
    eventsAttended: number
    clubsJoined: number
  }
}

export type SocialLink = {
  platform: number
  url: string
}

export type UserProfileResponse = {
  id: string
  fullName: string
  username: string
  email: string
  phoneNumber?: string | null
  major?: string | null
  avatarUrl?: string | null
  studentId?: string | null
  universityId?: string | null
  schoolName?: string | null
  className?: string | null
  gender?: string | null
  dob?: string | null
  address?: string | null
  isVerified: boolean
  roleName: string
  socialLinks?: SocialLink[]
}

export type UpdateUserProfileRequest = {
  fullName?: string
  phoneNumber?: string | null
  major?: string | null
  address?: string | null
  dob?: string | null
  gender?: string | null
  socialLinks?: SocialLink[]
}
