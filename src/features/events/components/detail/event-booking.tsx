"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { EventDetail } from "../../types"

export function EventBooking({ event }: { event: EventDetail }) {
  return (
    <Card className="border-none bg-white shadow-lg ring-1 ring-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Price</span>
          <span className="text-2xl font-bold">
            {event.price === 0 ? "Free" : `$${event.price}`}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          size="lg"
          className="w-full bg-orange-500 font-semibold text-white hover:bg-orange-600"
        >
          Register Now
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Limited seats available ({event.registeredSeats}/{event.totalSeats})
        </p>
      </CardContent>
    </Card>
  )
}
