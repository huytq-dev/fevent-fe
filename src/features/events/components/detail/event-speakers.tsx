import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { EventDetail } from "../../types"

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()

export function EventSpeakers({ speakers }: { speakers: EventDetail["speakers"] }) {
  if (!speakers.length) return null

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold">Meet the Speakers</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="rounded-xl border bg-white p-4 text-center">
            <Avatar className="mx-auto mb-3 h-20 w-20">
              <AvatarImage src={speaker.avatar} alt={speaker.name} />
              <AvatarFallback>{getInitials(speaker.name)}</AvatarFallback>
            </Avatar>
            <p className="font-bold">{speaker.name}</p>
            <p className="text-xs text-muted-foreground">
              {speaker.role}
              {speaker.company ? ` • ${speaker.company}` : ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
