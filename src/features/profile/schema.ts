import { z } from "zod";

//  Edit Profile
export const profileSchema = z.object({
    name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    major: z.string().max(200, "Chuyên ngành không được quá 200 ký tự").optional().or(z.literal("")),
    phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại phải hợp lệ"),
    address: z.string().optional(),
    dob: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    
    // Lưu ý: Các trường Socials này Backend của bạn hiện CHƯA CÓ
    // Nếu muốn giữ lại ở Frontend thì cứ để, nhưng API sẽ phải xử lý riêng
    facebook: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    github: z.string().url().optional().or(z.literal("")),
    socialLinks: z
      .array(
        z.object({
          platform: z.number().int(),
          url: z.string().url("Link không hợp lệ"),
        }),
      )
      .max(3, "Chỉ tối đa 3 liên kết"),
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;

// 2. Schema cho Change Password
export const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc"),
    newPassword: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không trùng khớp",
    path: ["confirmPassword"],
});

export type PasswordFormValues = z.infer<typeof passwordSchema>;
