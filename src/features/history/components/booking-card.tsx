import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarClock, MapPin, MoreVertical, Star, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookingEvent } from "../types";
import { FeedbackModal } from "./modal/feedback-modal";
import { TicketModal } from "./modal/ticket-modal";
import { CancelModal } from "./modal/cancel-modal";

export function BookingCard({
  event,
  onCancelled,
}: {
  event: BookingEvent;
  onCancelled?: () => void;
}) {
  // Logic màu sắc badge
  const statusStyles = {
    Confirmed: "bg-blue-100 text-blue-600 hover:bg-blue-100",
    Upcoming: "bg-orange-100 text-orange-600 hover:bg-orange-100",
    Attended: "bg-green-100 text-green-600 hover:bg-green-100",
    Missed: "bg-red-100 text-red-600 hover:bg-red-100",
  };

  const statusLabel = {
    Confirmed: "Đã xác nhận",
    Upcoming: "Sắp diễn ra",
    Attended: "Đã tham gia",
    Missed: "Đã hủy",
  };

  return (
    <Card className="p-4 flex flex-col md:flex-row gap-6 items-start border-none shadow-sm ring-1 ring-gray-100">
      {/* 1. Thumbnail + Date Badge */}
      <div className="relative w-full md:w-64 aspect-video md:aspect-4/3 rounded-lg overflow-hidden shrink-0">
        <Image src={event.thumbnail} alt={event.title} fill className="object-cover" />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold shadow-sm uppercase">
          {event.date}
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="flex-1 w-full space-y-3">
        {/* Header: Status + Reg Date + Menu */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Badge className={`rounded-md border-none ${statusStyles[event.status]}`}>
              {statusLabel[event.status]}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Đặt vé vào {event.registeredAt}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        {/* Title & Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-gray-400" />
              <span>{event.timeRange}</span>
            </div>
          </div>
        </div>

        {/* 3. Action Buttons (Conditional Rendering) */}
        <div className="pt-2 flex gap-3">
          {(event.status === "Upcoming" || event.status === "Confirmed") && (
            <>
              <TicketModal event={event}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">
                  <Ticket className="w-4 h-4 mr-2" /> Xem vé
                </Button>
              </TicketModal>
              <CancelModal registrationId={event.registrationId} onCancelled={onCancelled}>
                <Button variant="outline" className="rounded-full px-6 text-gray-600">
                  Hủy đặt vé
                </Button>
              </CancelModal>
            </>
          )}

            {event.status === "Missed" && (
             <TicketModal event={event}>
                <Button variant="secondary" className="rounded-full px-6 bg-gray-100 text-gray-700">
                  Xem vé
                </Button>
              </TicketModal>
            )}

          {event.status === "Attended" && (
            <>
              <Link href={`/events/${event.eventId}`}>
                <Button variant="secondary" className="rounded-full px-6 bg-gray-100 text-gray-700 hover:bg-gray-200">
                  Xem chi tiết
                </Button>
              </Link>
              <FeedbackModal event={event}>
                <Button variant="ghost" className="rounded-full px-4 text-orange-500 hover:text-orange-600 hover:bg-orange-50">
                  <Star className="h-4 w-4 mr-2" /> Đánh giá sự kiện
                </Button>
              </FeedbackModal>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
