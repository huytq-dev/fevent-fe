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
