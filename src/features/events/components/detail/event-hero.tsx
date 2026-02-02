import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import type { EventDetail } from "../../types"

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
}

export function EventHero({ event }: { event: EventDetail }) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border bg-muted">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-white/90 text-black hover:bg-white"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{event.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString("vi-VN", dateFormatOptions)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{event.timeRange}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
