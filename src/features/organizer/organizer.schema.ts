import { z } from "zod"

export const organizerEventSchema = z.object({
  title: z.string().min(3, "Vui lòng nhập tiêu đề sự kiện"),
  category: z.string().min(2, "Vui lòng chọn danh mục"),
  location: z.string().min(3, "Vui lòng nhập địa điểm"),
  startDate: z.string().min(1, "Chọn ngày bắt đầu"),
  startTime: z.string().min(1, "Chọn giờ bắt đầu"),
  endDate: z.string().min(1, "Chọn ngày kết thúc"),
  endTime: z.string().min(1, "Chọn giờ kết thúc"),
  capacity: z
    .number({ error: "Số lượng phải là số" })
    .min(1, "Số lượng tối thiểu là 1")
    .max(10000, "Số lượng tối đa là 10.000"),
  description: z.string().min(10, "Mô tả cần ít nhất 10 ký tự"),
  coverUrl: z.string().url("URL ảnh không hợp lệ").optional().or(z.literal("")),
  visibility: z.enum(["public", "private"]),
})

export type OrganizerEventFormValues = z.infer<typeof organizerEventSchema>

export const cancelEventSchema = z.object({
  reason: z.string().min(5, "Vui lòng nhập lý do hủy"),
})

export type CancelEventFormValues = z.infer<typeof cancelEventSchema>
