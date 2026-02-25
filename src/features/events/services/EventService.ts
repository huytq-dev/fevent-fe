import axiosInstance from "@/lib/axios"
import { API_ROUTES } from "@/config/apiRoute"
import type { ApiResponse } from "@/types/api"
import type { EventDetailResponse, EventSummary } from "../types"

type PagedResult<T> = {
  items: T[]
  totalCount?: number | null
}

const getEventsPath = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
  const hasApiSuffix = /\/api\/?$/.test(baseUrl)

  if (hasApiSuffix && API_ROUTES.EVENTS.startsWith("/api/")) {
    return API_ROUTES.EVENTS.replace(/^\/api/, "")
  }

  return API_ROUTES.EVENTS
}

export const eventService = {
  getAll: async (
    query?: { top?: number; skip?: number; orderBy?: string; needTotalCount?: boolean; isActive?: boolean; searchText?: string }
  ): Promise<ApiResponse<PagedResult<EventSummary>>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<PagedResult<EventSummary>>>(
        getEventsPath(),
        { params: query }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
  getById: async (id: string): Promise<ApiResponse<EventDetailResponse>> => {
    try {
      const response = await axiosInstance.get<ApiResponse<EventDetailResponse>>(
        `${getEventsPath()}/${id}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default eventService
