"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { EventDetail } from "../../types"
import { registrationService } from "@/services/RegistrationService"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function EventBooking({ event }: { event: EventDetail }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      const response = await registrationService.register(event.id)
      if (response?.isSuccess) {
        toast.success("Đăng ký thành công")
        router.push("/history")
      } else {
        toast.error("Đăng ký thất bại")
      }
    } catch (error: any) {
      toast.error("Đăng ký thất bại")
    } finally {
      setIsSubmitting(false)
    }
  }

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
          onClick={handleRegister}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang đăng ký..." : "Register Now"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Limited seats available ({event.registeredSeats}/{event.totalSeats})
        </p>
      </CardContent>
    </Card>
  )
}

