// 1. Generic API Response (Dùng chung cho toàn app)
export interface ApiResponse<T> {
    isSuccess: boolean
    statusCode: number
    message: string
    data?: T
    errors?: Record<string, string[]>
  }
  
  export interface PagedResponse<T> {
    pageIndex: number
    pageSize: number
    totalCount: number
    totalPages: number
    items: T[]
    hasPreviousPage: boolean
    hasNextPage: boolean
  }
  
  // 3. (Gợi ý thêm) API Response có phân trang
  // Ví dụ: ApiResponse<PagedResponse<User>>
  export type ApiPagedResponse<T> = ApiResponse<PagedResponse<T>>