import * as z from 'zod'

// --- LOGIN SCHEMA ---
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .min(1, { message: "Vui lòng nhập mật khẩu" }),
  remember: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// Login input type for API calls
export interface LoginInput {
  email: string
  password: string
  rememberMe?: boolean
}

// --- REGISTER SCHEMA ---
export const registerSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  username: z.string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .regex(/^[a-zA-Z0-9_]+$/, "Username chỉ chứa chữ, số và gạch dưới"),
  
  schoolName: z.string().min(5, "Vui lòng nhập tên trường"), 
  
  studentId: z.string()
    .min(1, "Vui lòng nhập MSSV")
    .regex(/^[a-zA-Z0-9]+$/, "MSSV không chứa ký tự đặc biệt"), 

  email: z.string()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
    
  password: z.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu cần chữ hoa, chữ thường và số"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
})

export type RegisterFormValues = z.infer<typeof registerSchema>

// --- FORGOT PASSWORD SCHEMA ---
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email" })
    .email({ message: "Email không đúng định dạng" }),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

// --- RESET PASSWORD SCHEMA ---
export const resetPasswordSchema = z.object({
  newPassword: z.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Mật khẩu cần chữ hoa, chữ thường và số"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
})

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>