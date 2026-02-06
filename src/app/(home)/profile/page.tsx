'use client'

import { useEffect, useState } from "react"
import { AcademicInfoCard } from "@/features/profile/components/academic-info-card"
import { ParticipationCard } from "@/features/profile/components/participation-card"
import { ProfileHeader } from "@/features/profile/components/profile-header"
import { SocialLinksCard } from "@/features/profile/components/social-links-card"
import { MOCK_PROFILE } from "@/features/profile/mock-data"
import type { UserProfile } from "@/features/profile/types"
import { getAuthState } from "@/utils/authUtils"

const buildProfileFromStorage = (): UserProfile => {
  const authState = getAuthState()

  return {
    ...MOCK_PROFILE,
    id: authState.userId || MOCK_PROFILE.id,
    name: authState.name || MOCK_PROFILE.name,
    email: authState.email || MOCK_PROFILE.email,
    avatar: authState.avatarUrl || MOCK_PROFILE.avatar,
  }
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(MOCK_PROFILE)

  useEffect(() => {
    setUser(buildProfileFromStorage())
  }, [])

  return (
    <div className="min-h-screen bg-gray-50/50 pb-10">
      <div className="container mx-auto max-w-5xl space-y-6 px-4 py-8 md:px-6">
        <ProfileHeader profile={user} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AcademicInfoCard profile={user} />
          </div>

          <div className="space-y-6">
            <SocialLinksCard socials={user.socials} />
            <ParticipationCard stats={user.stats} />
          </div>
        </div>
      </div>
    </div>
  )
}
