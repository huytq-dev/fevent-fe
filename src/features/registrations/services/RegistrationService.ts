import axiosInstance from '@/lib/axios'
import { API_ROUTES } from '@/config/apiRoute'
import type { ApiResponse } from '@/types/api'
import type { RegistrationDetailResponse, RegistrationSummaryResponse } from '../types'

const normalizeApiPath = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const hasApiSuffix = /\/api\/?$/.test(baseUrl)

  if (hasApiSuffix && path.startsWith('/api/')) {
    return path.replace(/^\/api/, '')
  }

  return path
}

export const registrationService = {
  register: async (eventId: string): Promise<ApiResponse<RegistrationDetailResponse>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<RegistrationDetailResponse>>(
        `${normalizeApiPath(API_ROUTES.EVENTS)}/${eventId}/registrations`,
        {},
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  getMyRegistrations: async (): Promise<ApiResponse<RegistrationSummaryResponse[]>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<RegistrationSummaryResponse[]>>(
        `${normalizeApiPath(API_ROUTES.REGISTRATIONS)}/me`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  getMyRegistrationById: async (
    id: string,
  ): Promise<ApiResponse<RegistrationDetailResponse>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<RegistrationDetailResponse>>(
        `${normalizeApiPath(API_ROUTES.REGISTRATIONS)}/${id}`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  cancel: async (id: string, reason?: string | null): Promise<ApiResponse<string>> => {
    try {
      const response = await axiosInstance.patch<ApiResponse<string>>(
        `${normalizeApiPath(API_ROUTES.REGISTRATIONS)}/${id}/cancel`,
        { reason: reason || null },
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default registrationService
