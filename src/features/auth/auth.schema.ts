import { z } from 'zod'

// =========================================
// 1. LOGIN
// =========================================
export const getLoginSchema = () =>
  z.object({
    email: z
      .string({ message: 'Email là bắt buộc' })
      .email({ message: 'Email không hợp lệ' })
      .toLowerCase()
      .trim(),
    password: z
      .string({ message: 'Mật khẩu là bắt buộc' })
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
      .max(50, { message: 'Mật khẩu quá dài' }),
    rememberMe: z.boolean().default(false).optional(),
  })

export type LoginInput = z.infer<ReturnType<typeof getLoginSchema>>
export type LoginRequest = LoginInput

// =========================================
// 2. REGISTER
// =========================================
export const getRegisterSchema = () =>
  z
    .object({
      name: z
        .string({ message: 'Tên là bắt buộc' })
        .min(2, { message: 'Tên phải có ít nhất 2 ký tự' })
        .max(50)
        .trim(),
      email: z
        .string({ message: 'Email là bắt buộc' })
        .email({ message: 'Email không hợp lệ' })
        .toLowerCase()
        .trim(),
      password: z
        .string({ message: 'Mật khẩu là bắt buộc' })
        .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
        .regex(/[A-Z]/, {
          message: 'Mật khẩu cần ít nhất 1 chữ hoa',
        })
        .regex(/[0-9]/, { message: 'Mật khẩu cần ít nhất 1 số' })
        .regex(/[^A-Za-z0-9]/, {
          message: 'Mật khẩu cần ít nhất 1 ký tự đặc biệt',
        }),
      confirmPassword: z.string({
        message: 'Vui lòng xác nhận mật khẩu',
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword'],
    })

export type RegisterInput = z.infer<ReturnType<typeof getRegisterSchema>>

// =========================================
// 3. PASSWORD FLOWS
// =========================================
export const getForgotPasswordSchema = () =>
  z.object({
    email: z
      .string()
      .min(1, 'Email là bắt buộc')
      .email('Email không hợp lệ')
      .toLowerCase()
      .trim(),
  })

export type ForgotPasswordInput = z.infer<ReturnType<typeof getForgotPasswordSchema>>

export const getResetPasswordSchema = () =>
  z
    .object({
      password: z
        .string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .regex(/[A-Z]/, 'Mật khẩu cần ít nhất 1 chữ hoa')
        .regex(/[0-9]/, 'Mật khẩu cần ít nhất 1 số'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword'],
    })

export type ResetPasswordInput = z.infer<ReturnType<typeof getResetPasswordSchema>>
