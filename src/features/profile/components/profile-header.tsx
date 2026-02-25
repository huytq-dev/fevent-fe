'use client'

import { useRef, useState, type ChangeEvent } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { userService } from "@/features/profile/services/UserService"
import { ChangePasswordModal } from "@/features/profile/modal/change-password-modal"
import { EditProfileModal } from "@/features/profile/modal/edit-profile-modal"
import { setUserAvatar } from "@/utils/authUtils"
import { Camera, Loader2, Lock, Pencil } from "lucide-react"
import { toast } from "sonner"
import type { UserProfile } from "../types"

type ProfileHeaderProps = {
  profile: UserProfile
  onAvatarUpdated?: (avatarUrl: string) => void
}

export function ProfileHeader({ profile, onAvatarUpdated }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handlePickAvatar = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn đúng định dạng ảnh")
      event.target.value = ""
      return
    }

    try {
      setIsUploading(true)
      const response = await userService.uploadAvatar(file)

      if (response?.isSuccess && response.data) {
        setUserAvatar(response.data)
        onAvatarUpdated?.(response.data)
        toast.success("Cập nhật ảnh đại diện thành công")
      } else {
        toast.error("Cập nhật ảnh đại diện thất bại")
      }
    } catch (error) {
      console.error("Upload avatar failed:", error)
      toast.error("Cập nhật ảnh đại diện thất bại")
    } finally {
      setIsUploading(false)
      event.target.value = ""
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-lg">
            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
            <span className="text-sm font-medium">Đang cập nhật ảnh đại diện...</span>
          </div>
        </div>
      )}

      <div className="relative h-40 bg-linear-to-r from-orange-50 to-orange-100/50" />

      <div className="relative px-6 pb-8">
        <div className="-mt-16 mb-6 flex flex-col items-center">
          <div className="relative">
            <button
              type="button"
              onClick={handlePickAvatar}
              className="group rounded-full"
              aria-label="Chọn ảnh đại diện"
            >
              <Avatar className="h-32 w-32 border-4 border-white shadow-md transition-opacity group-hover:opacity-90">
                <AvatarImage className="object-cover" src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute bottom-1 right-1 h-8 w-8 rounded-full border-2 border-white bg-orange-500 text-white hover:bg-orange-600"
              onClick={handlePickAvatar}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
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
              Chỉnh sửa hồ sơ
            </Button>
          </EditProfileModal>
          <ChangePasswordModal>
            <Button
              type="button"
              variant="outline" className="rounded-full px-8">
              <Lock className="mr-2 h-4 w-4" />
              Thay đổi mật khẩu
            </Button>
          </ChangePasswordModal>
        </div>
      </div>
    </div>
  )
}
