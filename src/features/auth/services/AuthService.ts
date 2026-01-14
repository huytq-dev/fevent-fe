import axios from 'axios'
import axiosInstance from '../../../lib/axios'
import { LoginRequest, LoginResponse } from '@/features/auth/auth.type'
import { ResetPasswordInput } from '@/features/auth/auth.schema'
export const authService = {
  loginAPI: async (params: LoginRequest) => {
    console.log('Service params: ', params)

    try {
      console.log(params)
      const response = await axiosInstance.post<LoginResponse>('/auth/login', {
        email: params.email,
        password: params.password,
      })
      console.log('Service Response: ', response)
      return response.data
    } catch (error) {
      throw error
    }
  },

  refreshTokenAPI: async (refreshToken: string) => {
    try {
      console.log('Show me refreshToken', refreshToken)
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        { refreshToken },
      )
      console.log('refreshToken Response: ', response)
      return response.data
    } catch (error) {
      throw error
    }
  },

  resetPassword: async (data: ResetPasswordInput) => {
    try {
      console.log('Show me refreshToken', data)
      return { success: true }
    } catch (error) {
      throw error
    }
  },

  forgotPassword: async (_params: unknown) => {
    try {
      return { success: true }
    } catch (_error) {
      throw _error
    }
  },
}

export default authService
