import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { EventProps } from "../../mock-data";

export function EventCard({ event }: { event: EventProps }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border-muted bg-card">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          {event.isHot && (
            <Badge variant="destructive" className="animate-pulse shadow-sm">🔥 HOT</Badge>
          )}
          <Badge variant="secondary" className="bg-background/80 text-foreground backdrop-blur shadow-sm">
            {event.club}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-2 flex-1">
        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/events/${event.id}`} className="focus:outline-none">
            {/* Stretched link trick: Click vào vùng trống title vẫn nhận */}
            <span className="absolute inset-0 z-0 md:hidden" aria-hidden="true" />
            {event.title}
          </Link>
        </h3>
        <div className="flex items-center text-sm text-muted-foreground gap-2 mt-2">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{event.date}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-2 relative z-10 pointer-events-none">
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Users className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{event.attendees} người tham gia</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto relative z-20">
        <Link href={`/events/${event.id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-colors">
            Chi tiết
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
