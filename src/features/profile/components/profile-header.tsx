'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChangePasswordModal } from "@/features/profile/modal/change-password-modal"
import { EditProfileModal } from "@/features/profile/modal/edit-profile-modal"
import { Camera, Lock, Pencil } from "lucide-react"
import type { UserProfile } from "../types"

export function ProfileHeader({ profile }: { profile: UserProfile }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="relative h-40 bg-linear-to-r from-orange-50 to-orange-100/50" />

      <div className="relative px-6 pb-8">
        <div className="-mt-16 mb-6 flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-1 right-1 h-8 w-8 rounded-full border-2 border-white bg-orange-500 text-white hover:bg-orange-600"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>

          <div className="mt-2 flex gap-2">
            <Badge variant="outline" className="border-orange-200 bg-orange-100 text-orange-600">
              {profile.studentId}
            </Badge>
            <Badge variant="outline" className="border-green-200 bg-green-100 text-green-600">
              {profile.status}
            </Badge>
          </div>

          <p className="mt-2 text-muted-foreground">{profile.major}</p>
        </div>

        <div className="mx-auto flex max-w-lg justify-center gap-4 border-t pt-6">
          <EditProfileModal profile={profile}>
            <Button
              type="button"
              className="rounded-full bg-orange-500 px-8 hover:bg-orange-600">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </EditProfileModal>
          <ChangePasswordModal>
            <Button
              type="button"
              variant="outline" className="rounded-full px-8">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </ChangePasswordModal>
        </div>
      </div>
    </div>
  )
}
