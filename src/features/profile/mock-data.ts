import type { UserProfile } from "./types"

export const MOCK_PROFILE: UserProfile = {
  id: "1",
  name: "Nguyen Van A",
  studentId: "SE150000",
  status: "Active Student",
  major: "Software Engineering Student",
  email: "annvse150000@fpt.edu.vn",
  campus: "FPT University HCMC",
  academicYear: "K15 (2019-2023)",
  phone: "+84 90 123 4567",
  avatar: "https://github.com/shadcn.png",
  address: "123 Le Van Viet, HCMC",
  gender: "Male",
  dob: "2001-10-15",
  socials: {
    linkedin: "https://linkedin.com/in/nguyen-van-a",
    github: "https://github.com/nguyenvana",
    facebook: "https://facebook.com/nguyenvana",
  },
  stats: {
    eventsAttended: 12,
    clubsJoined: 3,
  },
}
