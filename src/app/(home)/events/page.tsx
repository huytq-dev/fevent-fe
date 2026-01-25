"use client"

import { EventCard } from "@/features/events/components/event-card"
import { EventFilters } from "@/features/events/components/event-filters"
import { EventHeader } from "@/features/events/components/event-header"
import { EventPagination } from "@/features/events/components/event-pagination"
import { EventToolbar } from "@/features/events/components/event-toolbar"
import { EVENTS } from "@/features/events/mock-data"
import { motion } from "framer-motion"
import { useState } from "react"

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

  return (
    <div className="bg-gray-50/50 w-full pb-10">
      <div className="container mx-auto py-8 space-y-8 max-w-7xl px-4 md:px-6">
        
        <EventHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-3 space-y-6">
            <EventFilters />
          </aside>

          <main className="lg:col-span-9 space-y-6">
            
            <EventToolbar viewMode={viewMode} setViewMode={setViewMode} />

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
              {EVENTS.map((event) => (
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

            <div className="flex justify-center mt-10">
              <EventPagination />
            </div>
            
          </main>
        </div>
      </div>
    </div>
  )
}