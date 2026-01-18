import axios from 'axios'
import {
  getAuthToken,
  getRefreshToken,
  saveAuthToken,
  clearAuthData,
} from '@/utils/authUtils'

import { API_ROUTES } from '@/config/apiRoute'

// Normalize baseURL: loại bỏ dấu / ở cuối nếu có
const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || ''
  return url.replace(/\/+$/, '') // Loại bỏ tất cả dấu / ở cuối
}

const axiosInstance = axios.create({
  baseURL: getBaseURL(), // ⭐ Backend API URL từ env
  timeout: 10000,
  withCredentials: true, // 🔒 Gửi cookie cùng request
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/**
 * ⭐ Response Interceptor - Handle token expiry
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Nếu status 401 + chưa retry lần nào
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) {
          // Không có refresh token → redirect login
          // if (typeof window !== 'undefined') {
          //   window.location.href = '/'
          // }
          return Promise.reject(error)
        }

        // Gọi API refresh token
        const backendUrl = getBaseURL()
        const refreshResponse = await axios.post(
          `${backendUrl}${API_ROUTES.REFRESH}`,
          {},
          { 
            timeout: 5000,
            withCredentials: true,
          },
        )

        // Response là ApiResponse<LoginData>
        const responseData = refreshResponse.data
        if (responseData?.isSuccess && responseData?.data?.accessToken) {
          const accessToken = responseData.data.accessToken
          
          // Lưu access token mới (refreshToken được gửi qua cookie từ backend)
          saveAuthToken(accessToken)

          // Retry request cũ với token mới
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return axiosInstance(originalRequest)
        } else {
          throw new Error('Invalid refresh token response')
        }
      } catch (refreshError) {
        // Refresh thất bại → xóa token + redirect login
        clearAuthData()

        // if (typeof window !== 'undefined') {
        //   window.location.href = '/'
        // }

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
