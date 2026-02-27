"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import {
  CheckCircle2,
  MoreHorizontal,
  Pencil,
  Trash2,
  UploadCloud,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

import { ROUTES } from "@/config/routes"
import { ORGANIZER_EVENTS, ORGANIZER_STATS } from "../mock-data"
import { cancelEventSchema, type CancelEventFormValues } from "../organizer.schema"
import type { OrganizerEvent } from "../types"
import { EventStatusBadge } from "./event-status-badge"

const formatDateRange = (startTime: string, endTime: string) => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  return `${start.toLocaleDateString("vi-VN")} • ${start.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${end.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`
}

export function OrganizerDashboard() {
  const [events, setEvents] = useState<OrganizerEvent[]>(ORGANIZER_EVENTS)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [activeEventId, setActiveEventId] = useState<string | null>(null)

  const cancelForm = useForm<CancelEventFormValues>({
    resolver: zodResolver(cancelEventSchema),
    defaultValues: { reason: "" },
  })

  const stats = useMemo(() => {
    const published = events.filter((event) => event.status === "published").length
    return {
      ...ORGANIZER_STATS,
      activeEvents: published,
    }
  }, [events])

  const updateEvent = (id: string, data: Partial<OrganizerEvent>) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...data } : event)))
  }

  const handlePublish = (id: string) => {
    updateEvent(id, { status: "published" })
    toast.success("Sự kiện đã được xuất bản")
  }

  const handleCancel = (values: CancelEventFormValues) => {
    if (!activeEventId) return
    updateEvent(activeEventId, { status: "cancelled" })
    toast.success("Đã hủy sự kiện")
    cancelForm.reset()
    setCancelOpen(false)
    setActiveEventId(null)
  }

  const handleCancelOpenChange = (open: boolean) => {
    setCancelOpen(open)
    if (!open) {
      cancelForm.reset()
      setActiveEventId(null)
    }
  }

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
    toast.success("Đã xóa sự kiện")
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">Tổng số sự kiện</p>
            <p className="mt-2 text-2xl font-semibold">{stats.totalEvents}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">Sự kiện đang hoạt động</p>
            <p className="mt-2 text-2xl font-semibold">{stats.activeEvents}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">Người tham gia</p>
            <p className="mt-2 text-2xl font-semibold">{stats.totalParticipants}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">Tỷ lệ check-in</p>
            <p className="mt-2 text-2xl font-semibold">{Math.round(stats.checkInRate * 100)}%</p>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border bg-background p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Sự kiện của bạn</h2>
            <p className="text-sm text-muted-foreground">Theo dõi trạng thái và thao tác nhanh</p>
          </div>
          <Button asChild>
            <Link href={ROUTES.ORGANIZER_CREATE_EVENT}>Tạo sự kiện mới</Link>
          </Button>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sự kiện</TableHead>
                <TableHead>Lịch diễn ra</TableHead>
                <TableHead>Đăng ký</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="min-w-[220px]">
                    <div className="space-y-1">
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.location}</p>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-[180px] text-sm text-muted-foreground">
                    {formatDateRange(event.startTime, event.endTime)}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">
                      {event.registeredCount}/{event.capacity}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.category}</p>
                  </TableCell>
                  <TableCell>
                    <EventStatusBadge status={event.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`${ROUTES.ORGANIZER_EVENTS}/${event.id}/participants`}>
                          Danh sách
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`${ROUTES.ORGANIZER_EVENTS}/${event.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handlePublish(event.id)}
                            disabled={event.status === "published"}
                          >
                            <UploadCloud className="mr-2 h-4 w-4" />
                            Xuất bản
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setActiveEventId(event.id)
                              setCancelOpen(true)
                            }}
                            disabled={event.status === "cancelled"}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Hủy sự kiện
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onSelect={(event) => event.preventDefault()}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Xóa sự kiện
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Xóa sự kiện?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Thao tác này không thể hoàn tác. Sự kiện sẽ bị gỡ hoàn toàn.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(event.id)}>
                                  Xóa ngay
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Checklist trước ngày diễn ra</p>
                <p className="text-xs text-muted-foreground">
                  Chuẩn bị QR, danh sách và thông báo người tham gia
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-50 p-2 text-amber-600">
                <UploadCloud className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Xuất file nhanh</p>
                <p className="text-xs text-muted-foreground">
                  Vào danh sách người tham gia để xuất CSV/Excel
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={cancelOpen} onOpenChange={handleCancelOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hủy sự kiện</DialogTitle>
            <DialogDescription>
              Vui lòng nhập lý do để hệ thống gửi thông báo đến người tham gia.
            </DialogDescription>
          </DialogHeader>
          <Form {...cancelForm}>
            <form onSubmit={cancelForm.handleSubmit(handleCancel)} className="space-y-4">
              <FormField
                control={cancelForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lý do hủy</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Textarea rows={4} placeholder="Ví dụ: Thay đổi lịch..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setCancelOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit" variant="destructive">
                  Xác nhận hủy
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
