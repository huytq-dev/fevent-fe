import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  event: {
    id: number
    slug: string
    title: string
    date: { day: string; month: string }
    time: string
    location: string
    category: string
    status: string
    isPopular: boolean
    image: string
  }
  isList?: boolean
}

export function EventCard({ event, isList = false }: EventCardProps) {
  return (
    <Card
      className={`p-0 overflow-hidden border border-gray-100 hover:shadow-lg hover:border-orange-100 transition-all duration-300 bg-white group h-full items-stretch
      ${isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
    >

      <div className={`relative bg-gray-200 shrink-0 
        ${isList
          ? 'w-full sm:w-40 h-40 sm:h-auto rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none'
          : 'w-full h-48 overflow-hidden'
        }`}>

        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105
            ${isList ? 'rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none' : ''}
          `}
        />

        <div className={`absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300
          ${isList ? 'rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none' : ''}
        `} />

        {/* Badge Popular */}
        {event.isPopular && (
          <Badge className={`absolute top-2 left-2 bg-orange-100 text-orange-600 hover:bg-orange-100 border border-orange-200 shadow-sm z-10
            ${isList ? 'px-1.5 py-0 text-[10px]' : 'px-2.5 py-0.5'}`}>
            🔥 {isList ? 'Hot' : 'Phổ biến'}
          </Badge>
        )}

        {/* Date Box */}
        <div className={`absolute bottom-2 right-2 bg-white rounded-lg text-center shadow-md border border-gray-100 z-10 origin-bottom-right
          ${isList ? 'p-1 min-w-[40px] scale-90' : 'p-2 min-w-[56px]'}`}>
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">
            {event.date.month}
          </span>
          <span className={`block font-extrabold text-gray-900 leading-none mt-0.5 
            ${isList ? 'text-base' : 'text-xl'}`}>
            {event.date.day}
          </span>
        </div>
      </div>

      {/* Wrapper nội dung */}
      <div className="flex flex-col grow justify-between">

        {/* Header */}
        <CardHeader className={`${isList ? 'p-3 pb-1 space-y-1' : 'p-5 pb-2 space-y-3'}`}>
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="text-[10px] uppercase font-bold tracking-wider rounded-sm text-orange-600 border-orange-200 bg-orange-50 px-2 py-0.5"
            >
              {event.category}
            </Badge>

            {event.status === "FILLING FAST" && (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full animate-pulse">
                Sắp đầy ⚡
              </span>
            )}

            {event.status === "CLOSED" && (
              <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Đã đóng
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors 
            ${isList ? 'text-base min-h-0' : 'text-lg min-h-14'}`}>
            <Link href={`/events/${event.slug}`} className="hover:underline focus:outline-none">
              {event.title}
            </Link>
          </h3>
        </CardHeader>

        {/* Content */}
        <CardContent className={`${isList ? 'p-3 py-1' : 'p-5 pt-1'} grow flex flex-col justify-start`}>
          <div className={`border-t border-dashed border-gray-100 w-full 
            ${isList ? 'pt-1 space-y-1' : 'pt-2 space-y-2'}`}>

            <div className="flex items-start text-sm text-gray-500 gap-2.5">
              <Clock className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <span className={isList ? 'text-xs' : 'text-sm'}>{event.time}</span>
            </div>

            <div className="flex items-start text-sm text-gray-500 gap-2.5">
              <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
              <span className={`line-clamp-1 ${isList ? 'text-xs' : 'text-sm'}`}>{event.location}</span>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className={`${isList ? 'p-3 pt-0' : 'p-5 pt-0'} mt-auto`}>
          {event.status === "CLOSED" ? (
            <Button
              disabled
              className={`w-full font-bold shadow-sm transition-all 
                ${isList ? 'h-8 text-xs' : ''} 
                bg-gray-100 text-gray-400 hover:bg-gray-100`}
            >
              Đã đóng
            </Button>
          ) : (
            <Button
              asChild
              className={`w-full font-bold shadow-sm transition-all 
                ${isList ? 'h-8 text-xs' : ''} 
                bg-orange-600 hover:bg-orange-700 text-white`}
            >
              <Link href={`/events/${event.slug}`}>Đăng ký ngay →</Link>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  )
}
