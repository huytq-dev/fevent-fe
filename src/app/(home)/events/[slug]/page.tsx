import { notFound } from "next/navigation"
import { EventHero } from "@/features/events/components/detail/event-hero"
import { EventInfo } from "@/features/events/components/detail/event-info"
import { EventSchedule } from "@/features/events/components/detail/event-schedule"
import { EventSidebar } from "@/features/events/components/detail/event-sidebar"
import { EventSpeakers } from "@/features/events/components/detail/event-speakers"
import { EVENT_DETAILS } from "@/features/events/mock-data"

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = EVENT_DETAILS.find((item) => item.slug === params.slug)

  if (!event) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <EventHero event={event} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <main className="space-y-10 lg:col-span-8">
            <EventInfo event={event} />
            <EventSchedule schedule={event.schedule} />
            <EventSpeakers speakers={event.speakers} />
          </main>

          <aside className="lg:col-span-4">
            <EventSidebar event={event} />
          </aside>
        </div>
      </div>
    </div>
  )
}
