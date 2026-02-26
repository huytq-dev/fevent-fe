import axiosInstance from '@/lib/axios'
import { API_ROUTES } from '@/config/apiRoute'
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordInput,
  ResetPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  LogoutRequest,
  LogoutResponse,
  ConfirmEmailResponse,
} from '@/features/auth/auth.type'

export const authService = {
  /**
   * Đăng nhập
   */
  loginAPI: async (params: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(API_ROUTES.LOGIN, {
        email: params.email,
        password: params.password,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Đăng ký
   */
  registerAPI: async (params: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await axiosInstance.post<RegisterResponse>(API_ROUTES.REGISTER, {
        name: params.name,
        username: params.username,
        email: params.email,
        password: params.password,
        studentId: params.studentId,
        schoolName: params.schoolName,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Đăng xuất
   */
  logoutAPI: async (params?: LogoutRequest): Promise<LogoutResponse> => {
    try {
      const response = await axiosInstance.post<LogoutResponse>(API_ROUTES.LOGOUT, params || {})
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Refresh token
   */
  refreshTokenAPI: async (): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(API_ROUTES.REFRESH)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Quên mật khẩu
   */
  forgotPasswordAPI: async (params: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      const response = await axiosInstance.post<ForgotPasswordResponse>(
        API_ROUTES.FORGOT_PASSWORD,
        {
          email: params.email,
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Đặt lại mật khẩu
   */
  resetPasswordAPI: async (data: ResetPasswordInput): Promise<ResetPasswordResponse> => {
    try {
      const response = await axiosInstance.post<ResetPasswordResponse>(API_ROUTES.RESET_PASSWORD, {
        token: data.token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Đổi mật khẩu (yêu cầu đăng nhập)
   */
  changePasswordAPI: async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    try {
      const response = await axiosInstance.post<ChangePasswordResponse>(API_ROUTES.CHANGE_PASSWORD, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Xác thực email
   */
  confirmEmailAPI: async (token: string): Promise<ConfirmEmailResponse> => {
    try {
      const response = await axiosInstance.post<ConfirmEmailResponse>(
        API_ROUTES.CONFIRM_EMAIL,
        { token }
      )
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default authService
