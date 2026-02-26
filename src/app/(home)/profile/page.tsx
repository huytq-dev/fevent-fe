'use client'

import { useEffect, useState } from "react"
import { AcademicInfoCard } from "@/features/profile/components/academic-info-card"
import { ParticipationCard } from "@/features/profile/components/participation-card"
import { ProfileHeader } from "@/features/profile/components/profile-header"
import { SocialLinksCard } from "@/features/profile/components/social-links-card"
import type { UserProfile } from "@/features/profile/types"
import { decodeToken, getAuthState } from "@/utils/authUtils"
import type { CustomJwtPayload } from "@/types/auth"
import { registrationService } from "@/services/RegistrationService"
import { userService } from "@/services/UserService"
import type { UserProfileResponse } from "@/features/profile/types"

const REGISTRATION_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  CHECKED_IN: 2,
  CANCELLED: 3,
} as const;

const buildProfileFromStorage = (): UserProfile => {
  const authState = getAuthState()
  const decoded: CustomJwtPayload | null = authState.token ? decodeToken(authState.token) : null

  const resolvedName =
    authState.name ||
    decoded?.name ||
    decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
    "Người dùng"
  const resolvedEmail =
    authState.email ||
    decoded?.email ||
    decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
    "Chưa cập nhật"
  const resolvedAvatar =
    authState.avatarUrl || decoded?.avatarUrl || decoded?.avatar || decoded?.picture || "https://github.com/shadcn.png"

  return {
    id: authState.userId || "unknown",
    name: resolvedName,
    studentId: "Chưa cập nhật",
    status: "Active Student",
    major: "Chưa cập nhật",
    email: resolvedEmail,
    campus: "Chưa cập nhật",
    academicYear: "Chưa cập nhật",
    dob: "Chưa cập nhật",
    phone: "Chưa cập nhật",
    avatar: resolvedAvatar,
    socialLinks: [],
    socials: {},
    stats: {
      eventsAttended: 0,
      clubsJoined: 0,
    },
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(buildProfileFromStorage)

  const formatDob = (value?: string | null) => {
    if (!value) return "Chưa cập nhật"
    const dateOnly = value.split("T")[0]
    return dateOnly || "Chưa cập nhật"
  }

  const applyProfileResponse = (data: UserProfileResponse) => {
    setUser(prev => ({
      ...prev,
      id: data.id,
      name: data.fullName || prev.name,
      studentId: data.studentId || data.universityId || prev.studentId,
      status: data.isVerified ? "Active Student" : "Inactive",
      major: data.major || prev.major,
      email: data.email || prev.email,
      phone: data.phoneNumber || prev.phone,
      avatar: data.avatarUrl || prev.avatar,
      address: data.address || prev.address,
      gender: data.gender || prev.gender,
      dob: formatDob(data.dob),
      campus: data.schoolName || prev.campus,
      socialLinks: data.socialLinks || prev.socialLinks,
    }))
  }

  useEffect(() => {
    let isMounted = true

    const fetchAllData = async () => {
      try {
        const [profileRes, statsRes] = await Promise.allSettled([
          userService.getMe(),
          registrationService.getMyRegistrations()
        ]);

        if (!isMounted) return;

        // Xử lý dữ liệu Profile
        if (profileRes.status === 'fulfilled' && profileRes.value?.isSuccess && profileRes.value.data) {
          applyProfileResponse(profileRes.value.data);
        } else if (profileRes.status === 'rejected') {
          console.error("Lỗi khi tải thông tin user:", profileRes.reason);
        }

        // Xử lý dữ liệu Thống kê (Stats)
        if (statsRes.status === 'fulfilled' && statsRes.value?.isSuccess && statsRes.value.data) {
          const attended = statsRes.value.data.filter(
            (item) => item.status === REGISTRATION_STATUS.CHECKED_IN
          ).length;
          
          setUser(prev => ({
            ...prev,
            stats: {
              ...prev.stats,
              eventsAttended: attended,
            },
          }));
        } else if (statsRes.status === 'rejected') {
          console.error("Lỗi khi tải thống kê:", statsRes.reason);
        }

      } catch (error) {
        console.error("Lỗi không xác định khi fetch data Profile:", error);
      }
    }

    fetchAllData();

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <div className="container mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-6">
        <ProfileHeader
          profile={user}
          onAvatarUpdated={(avatarUrl) =>
            setUser((prev) => ({
              ...prev,
              avatar: avatarUrl,
            }))
          }
          onProfileUpdated={applyProfileResponse}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AcademicInfoCard profile={user} />
          </div>

          <div className="space-y-6">
            <SocialLinksCard socialLinks={user.socialLinks} />
            {/* <ParticipationCard stats={user.stats} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

