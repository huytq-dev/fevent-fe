import axiosInstance from '@/lib/axios'
import { API_ROUTES } from '@/config/apiRoute'
import type { ApiResponse } from '@/types/api'

export type UserProfileResponse = {
  id: string
  fullName: string
  username: string
  email: string
  phoneNumber?: string | null
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
}

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
}

export default userService
