"use client"

import { EventCard } from "@/features/events/components/event-card"
import { EventFilters } from "@/features/events/components/event-filters"
import { EventHeader } from "@/features/events/components/event-header"
import { EventPagination } from "@/features/events/components/event-pagination"
import { EventToolbar } from "@/features/events/components/event-toolbar"
import { eventService } from "@/services/EventService"
import type { EventSummary } from "@/features/events/types"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05 
    }
  }
} 

const itemVariants = {
  hidden: { opacity: 0, y: 20 }, 
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: "easeOut" } 
  }
} as const;

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [events, setEvents] = useState<EventSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadEvents = async () => {
      try {
        const response = await eventService.getAll()

        if (response?.isSuccess || response?.statusCode === 200) {
          const items = response.data?.items ?? []
          if (isMounted) {
            setEvents(items)
            setError(null)
          }
          return
        }

        if (isMounted) {
          setError(response?.message || "Không thể tải danh sách sự kiện.")
        }
      } catch (err) {
        if (isMounted) {
          setError("Không thể tải danh sách sự kiện.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="bg-gray-50/50 w-full pb-10">
      <div className="container mx-auto py-8 space-y-8 max-w-7xl px-4 md:px-6">
        
        <EventHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-3 space-y-6">
            <EventFilters />
          </aside>

          <main className="lg:col-span-9 space-y-6">
            
            <EventToolbar
              viewMode={viewMode}
              setViewMode={setViewMode}
              totalEvents={events.length}
            />

            {isLoading ? (
              <div className="rounded-lg border border-gray-100 bg-white p-6 text-sm text-gray-500">
                Đang tải danh sách sự kiện...
              </div>
            ) : error ? (
              <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-sm text-red-600">
                {error}
              </div>
            ) : events.length === 0 ? (
              <div className="rounded-lg border border-gray-100 bg-white p-6 text-sm text-gray-500">
                Không có sự kiện nào.
              </div>
            ) : (
              <motion.div
                key={viewMode}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                    : "flex flex-col gap-4"
                }
              >
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={itemVariants}
                    layout
                  >
                    <EventCard 
                      event={event} 
                      isList={viewMode === "list"} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!isLoading && !error && events.length > 0 && (
              <div className="flex justify-center mt-10">
                <EventPagination />
              </div>
            )}
            
          </main>
        </div>
      </div>
    </div>
  )
}

