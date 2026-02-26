"use client"

import { EventHero } from "@/features/events/components/detail/event-hero"
import { EventInfo } from "@/features/events/components/detail/event-info"
import { EventSchedule } from "@/features/events/components/detail/event-schedule"
import { EventSidebar } from "@/features/events/components/detail/event-sidebar"
import { EventSpeakers } from "@/features/events/components/detail/event-speakers"
import { eventService } from "@/services/EventService"
import type { EventDetail, EventDetailResponse } from "@/features/events/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const buildTimeRange = (startTime: string, endTime: string) => {
  const start = new Date(startTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
  const end = new Date(endTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
  return `${start} - ${end}`
}

const mapToEventDetail = (data: EventDetailResponse): EventDetail => ({
  id: data.id,
  title: data.title,
  date: data.startTime,
  timeRange: buildTimeRange(data.startTime, data.endTime),
  location: data.locationName,
  locationMapUrl: data.locationMapUrl,
  description: data.description || "",
  price: 0,
  totalSeats: data.maxParticipants,
  registeredSeats: data.registeredCount,
  image: data.thumbnailUrl || "https://picsum.photos/seed/fevent-detail/1200/700",
  tags: data.categoryName ? [data.categoryName] : [],
  takeaways: [],
  schedule: [],
  speakers: [],
  host: {
    name: data.organizerName,
    avatar: data.organizerAvatarUrl || "",
  },
})

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params?.id as string | undefined
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!eventId) {
      setIsLoading(false)
      setError("ID sự kiện không hợp lệ.")
      return
    }
    let isMounted = true

    const loadEvent = async () => {
      try {
        const response = await eventService.getById(eventId)
        if (response?.isSuccess || response?.statusCode === 200) {
          const data = response.data
          if (data && isMounted) {
            setEvent(mapToEventDetail(data))
            setError(null)
          }
          return
        }

        if (isMounted) {
          setError(response?.message || "Không thể tải sự kiện.")
        }
      } catch (err) {
        if (isMounted) {
          setError("Không thể tải sự kiện.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadEvent()

    return () => {
      isMounted = false
    }
  }, [eventId])

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        {isLoading ? (
          <div className="rounded-lg border border-gray-100 bg-white p-6 text-sm text-gray-500">
            Đang tải sự kiện...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-sm text-red-600">
            {error}
          </div>
        ) : event ? (
          <>
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
          </>
        ) : (
          <div className="rounded-lg border border-gray-100 bg-white p-6 text-sm text-gray-500">
            Không tìm thấy sự kiện.
          </div>
        )}
      </div>
    </div>
  )
}

