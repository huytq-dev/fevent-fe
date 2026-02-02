import type { EventDetail } from "../../types"

export function EventSchedule({ schedule }: { schedule: EventDetail["schedule"] }) {
  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold">Event Schedule</h3>
      <div className="relative ml-3 space-y-8 border-l-2 border-muted pb-2">
        {schedule.map((item, index) => (
          <div key={`${item.time}-${index}`} className="relative pl-8">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-orange-500 ring-4 ring-white" />

            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-orange-600">{item.time}</span>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
