"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { organizerEventSchema, type OrganizerEventFormValues } from "../organizer.schema"
import type { OrganizerEvent } from "../types"

const CATEGORY_OPTIONS = [
  "Công nghệ",
  "Thiết kế",
  "Âm nhạc",
  "Hướng nghiệp",
  "Khởi nghiệp",
]

const toDefaultValues = (event?: OrganizerEvent): OrganizerEventFormValues => {
  if (!event) {
    return {
      title: "",
      category: "",
      location: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      capacity: 100,
      description: "",
      coverUrl: "",
      visibility: "public",
    }
  }

  const start = new Date(event.startTime)
  const end = new Date(event.endTime)

  return {
    title: event.title,
    category: event.category,
    location: event.location,
    startDate: start.toISOString().slice(0, 10),
    startTime: start.toISOString().slice(11, 16),
    endDate: end.toISOString().slice(0, 10),
    endTime: end.toISOString().slice(11, 16),
    capacity: event.capacity,
    description: "Cập nhật nội dung sự kiện tại đây.",
    coverUrl: event.coverUrl || "",
    visibility: "public",
  }
}

export function OrganizerEventForm({
  event,
  mode,
}: {
  event?: OrganizerEvent
  mode: "create" | "edit"
}) {
  const form = useForm<OrganizerEventFormValues>({
    resolver: zodResolver(organizerEventSchema),
    defaultValues: toDefaultValues(event),
  })

  const onSubmit = (values: OrganizerEventFormValues) => {
    if (mode === "create") {
      toast.success("Đã tạo sự kiện (mock)")
    } else {
      toast.success("Đã cập nhật sự kiện (mock)")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề sự kiện</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="VD: Tech Meetup 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh mục</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa điểm</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="FPT Hall - HCM" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày bắt đầu</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giờ bắt đầu</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày kết thúc</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giờ kết thúc</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sức chứa</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hiển thị</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn chế độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Công khai</SelectItem>
                        <SelectItem value="private">Nội bộ</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh cover</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea rows={6} placeholder="Nội dung chi tiết..." {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline">
            Lưu nháp
          </Button>
          <Button type="submit">{mode === "create" ? "Tạo sự kiện" : "Cập nhật"}</Button>
        </div>
      </form>
    </Form>
  )
}
