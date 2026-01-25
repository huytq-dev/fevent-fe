import axios from 'axios'
import {
  getAuthToken,
  getRefreshToken,
  saveAuthToken,
  clearAuthData,
} from '@/utils/authUtils'
import { API_ROUTES } from '@/config/apiRoute'

// Normalize baseURL: remove trailing slashes.
const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || ''
  return url.replace(/\/+$/, '')
}

const axiosInstance = axios.create({
  baseURL: getBaseURL(), // Backend API URL from env
  timeout: 10000,
  withCredentials: true, // Send cookies with requests
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

let isRefreshing = false
let refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null) => {
  refreshQueue.forEach((p) => {
    if (error) {
      p.reject(error)
      return
    }
    if (token) {
      p.resolve(token)
    }
  })
  refreshQueue = []
}

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('Missing refresh token')
  }

  const backendUrl = getBaseURL()
  const refreshResponse = await axios.post(
    `${backendUrl}${API_ROUTES.REFRESH}`,
    {},
    {
      timeout: 5000,
      withCredentials: true,
    },
  )

  const responseData = refreshResponse.data
  if (responseData?.isSuccess && responseData?.data?.accessToken) {
    const accessToken = responseData.data.accessToken
    saveAuthToken(accessToken)
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    return accessToken
  }

  throw new Error('Invalid refresh token response')
}

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              originalRequest.headers = originalRequest.headers ?? {}
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(axiosInstance(originalRequest))
            },
            reject,
          })
        })
      }

      isRefreshing = true
      try {
        const accessToken = await refreshAccessToken()
        processQueue(null, accessToken)
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        clearAuthData()
        redirectToLogin()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
