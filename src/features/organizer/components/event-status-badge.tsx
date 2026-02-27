import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { OrganizerEventStatus } from "../types"

const STATUS_LABELS: Record<OrganizerEventStatus, string> = {
  draft: "Nháp",
  published: "Đã xuất bản",
  cancelled: "Đã hủy",
  ended: "Đã kết thúc",
}

const STATUS_STYLES: Record<OrganizerEventStatus, string> = {
  draft: "border-slate-200 bg-slate-50 text-slate-600",
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cancelled: "border-rose-200 bg-rose-50 text-rose-700",
  ended: "border-amber-200 bg-amber-50 text-amber-700",
}

export function EventStatusBadge({ status }: { status: OrganizerEventStatus }) {
  return (
    <Badge className={cn("border text-xs font-semibold", STATUS_STYLES[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
