import { ApiResponse } from "@/types/api"
import { UserRole } from "@/config/role"
/**
 * 2. USER MODELS
 */
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  storeId?: string
  createdAt?: string
}

export interface JWTPayload {
  id: string
  email: string
  name: string
  role: string
  storeId?: string
  iat: number
  exp: number
}

/**
 * 3. AUTH TYPES & REQUESTS
 */

// --- LOGIN ---
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

// Dữ liệu thực tế nhận được khi Login thành công (khớp với SignInResponse)
export interface LoginData {
  accessToken: string
  expiresIn: number
  // RefreshToken được gửi qua cookie, không có trong response JSON
}

// Response login bọc trong ApiResponse
export type LoginResponse = ApiResponse<LoginData>


// --- REGISTER ---
export interface RegisterRequest {
  name: string
  username: string
  email: string
  password: string
  studentId: string
  schoolName: string
}

// Đăng ký xong trả về message (khớp với SignUpResponse)
export interface RegisterData {
  message: string
}

export type RegisterResponse = ApiResponse<RegisterData>


// --- PASSWORD FLOW ---
export interface ForgotPasswordRequest {
  email: string
}

// Response có message trong data (khớp với ForgotPasswordResponse)
export interface ForgotPasswordData {
  message: string
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordData>

export interface ResetPasswordInput {
  token: string
  newPassword: string
  confirmPassword: string
}

// Response có message trong data (khớp với ResetPasswordResponse)
export interface ResetPasswordData {
  message: string
}

export type ResetPasswordResponse = ApiResponse<ResetPasswordData>


// --- LOGOUT ---
export interface LogoutRequest {
  userId?: string
  accessToken?: string
}

// Response có message trong data (khớp với SignOutResponse)
export interface LogoutData {
  message: string
}

export type LogoutResponse = ApiResponse<LogoutData>


// --- VERIFY EMAIL ---
export interface ConfirmEmailRequest {
  token: string
}

// Response có message trong data (khớp với ConfirmEmailResponse)
export interface ConfirmEmailData {
  message: string
}

export type ConfirmEmailResponse = ApiResponse<ConfirmEmailData>