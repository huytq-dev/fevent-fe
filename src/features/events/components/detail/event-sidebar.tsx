import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import type { EventDetail } from "../../types"
import { EventBooking } from "./event-booking"

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

export function EventSidebar({ event }: { event: EventDetail }) {
  return (
    <div className="sticky top-24 space-y-6">
      <EventBooking event={event} />

      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
            <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
              Map View
            </span>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-orange-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 text-orange-500" />
              <span>{new Date(event.date).toLocaleDateString("vi-VN", dateFormatOptions)}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-orange-500" />
              <span>{event.timeRange}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardContent className="flex items-center gap-4 p-4">
          <Avatar>
            <AvatarImage src={event.host.avatar} alt={event.host.name} />
            <AvatarFallback>{getInitials(event.host.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Hosted by</p>
            <p className="font-bold">{event.host.name}</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            Follow
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
