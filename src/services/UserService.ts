import axiosInstance from '@/lib/axios'
import { API_ROUTES } from '@/config/apiRoute'
import type { ApiResponse } from '@/types/api'
import type { UpdateUserProfileRequest, UserProfileResponse } from '@/features/profile/types'

const normalizeUserProfileResponse = (raw: any): UserProfileResponse => ({
  id: raw?.id ?? raw?.Id,
  fullName: raw?.fullName ?? raw?.FullName ?? "",
  username: raw?.username ?? raw?.Username ?? "",
  email: raw?.email ?? raw?.Email ?? "",
  phoneNumber: raw?.phoneNumber ?? raw?.PhoneNumber ?? null,
  major: raw?.major ?? raw?.Major ?? null,
  avatarUrl: raw?.avatarUrl ?? raw?.AvatarUrl ?? null,
  studentId: raw?.studentId ?? raw?.StudentId ?? null,
  universityId: raw?.universityId ?? raw?.UniversityId ?? null,
  schoolName: raw?.schoolName ?? raw?.SchoolName ?? null,
  className: raw?.className ?? raw?.ClassName ?? null,
  gender: raw?.gender ?? raw?.Gender ?? null,
  dob: raw?.dob ?? raw?.DOB ?? null,
  address: raw?.address ?? raw?.Address ?? null,
  isVerified: raw?.isVerified ?? raw?.IsVerified ?? false,
  roleName: raw?.roleName ?? raw?.RoleName ?? "",
  socialLinks: raw?.socialLinks ?? raw?.SocialLinks ?? [],
})

const normalizeApiPath = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const hasApiSuffix = /\/api\/?$/.test(baseUrl)

  if (hasApiSuffix && path.startsWith('/api/')) {
    return path.replace(/^\/api/, '')
  }

  return path
}

export const userService = {
  getMe: async (): Promise<ApiResponse<UserProfileResponse>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<UserProfileResponse>>(
        `${normalizeApiPath(API_ROUTES.USERS)}/me`,
      )
      if (response.data?.data) {
        response.data.data = normalizeUserProfileResponse(response.data.data)
      }
      return response.data
    } catch (error) {
      throw error
    }
  },
  uploadAvatar: async (file: File): Promise<ApiResponse<string>> => {
    try {
      const formData = new FormData()
      formData.append('File', file)

      const response = await axiosInstance.patch<ApiResponse<string>>(
        `${normalizeApiPath(API_ROUTES.USERS)}/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  updateProfile: async (
    payload: UpdateUserProfileRequest,
  ): Promise<ApiResponse<UserProfileResponse>> => {
    try {
      const response = await axiosInstance.patch<ApiResponse<UserProfileResponse>>(
        `${normalizeApiPath(API_ROUTES.USERS)}/me`,
        payload,
      )
      if (response.data?.data) {
        response.data.data = normalizeUserProfileResponse(response.data.data)
      }
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default userService
