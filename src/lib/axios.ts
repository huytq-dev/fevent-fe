import axios from 'axios'
import {
  getAuthToken,
  getRefreshToken,
  saveAuthToken,
  saveRefreshToken,
  clearAuthData,
} from '@/utils/authUtils'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ⭐ Backend API URL
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
        const backendUrl = process.env.NEXT_PUBLIC_API_URL
        const refreshResponse = await axios.post(
          `${backendUrl}/auth/refresh-token`,
          { refreshToken },
          { timeout: 5000 },
        )

        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data

        // Lưu token mới
        saveAuthToken(accessToken)
        if (newRefreshToken) saveRefreshToken(newRefreshToken)

        // Retry request cũ với token mới
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
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
