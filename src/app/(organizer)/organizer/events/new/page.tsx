import { OrganizerEventForm } from "@/features/organizer/components/organizer-event-form"

export default function OrganizerCreateEventPage() {
  return (
    <div className="rounded-xl border bg-background p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Tạo sự kiện mới</h2>
        <p className="text-sm text-muted-foreground">
          Điền thông tin cơ bản trước khi xuất bản
        </p>
      </div>
      <OrganizerEventForm mode="create" />
    </div>
  )
}
