import { OrganizerEventForm } from "@/features/organizer/components/organizer-event-form"
import { getOrganizerEventById } from "@/features/organizer/mock-data"

export default function OrganizerEditEventPage({ params }: { params: { id: string } }) {
  const event = getOrganizerEventById(params.id)

  return (
    <div className="rounded-xl border bg-background p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Cập nhật sự kiện</h2>
        <p className="text-sm text-muted-foreground">
          Chỉnh sửa thông tin và lưu lại
        </p>
      </div>
      <OrganizerEventForm mode="edit" event={event} />
    </div>
  )
}
