import axiosInstance from '@/lib/axios'
import { API_ROUTES } from '@/config/apiRoute'
import type { ApiResponse } from '@/types/api'

export type CreateEventReviewRequest = {
  rating: number
  content?: string
}

export type EventReviewResponse = {
  id: string
  eventId: string
  userId: string
  rating: number
  content: string
  createdAt: string
}

const normalizeApiPath = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const hasApiSuffix = /\/api\/?$/.test(baseUrl)

  if (hasApiSuffix && path.startsWith('/api/')) {
    return path.replace(/^\/api/, '')
  }

  return path
}

export const reviewService = {
  create: async (
    eventId: string,
    payload: CreateEventReviewRequest,
  ): Promise<ApiResponse<EventReviewResponse>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<EventReviewResponse>>(
        `${normalizeApiPath(API_ROUTES.EVENTS)}/${eventId}/reviews`,
        payload,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default reviewService
