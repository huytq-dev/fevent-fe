import type { EventDetail } from "../../types"

export function EventInfo({ event }: { event: EventDetail }) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-bold">About this event</h3>
      <p className="leading-relaxed text-muted-foreground">
        {event.description || "Join us for an immersive workshop exploring..."}
      </p>

      {event.takeaways && event.takeaways.length > 0 && (
        <div className="rounded-lg border bg-white p-6">
          <h4 className="mb-3 font-semibold">Key Takeaways:</h4>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {event.takeaways.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
