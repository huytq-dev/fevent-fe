"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EventCard } from "../shared/event-card";
import { EventProps } from "../../mock-data";

interface EventCarouselProps {
  events: EventProps[];
}

export function EventCarousel({ events }: EventCarouselProps) {
  if (!events || events.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {events.map((event) => (
          <CarouselItem key={event.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="h-full p-1">
               <EventCard event={event} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Nút điều hướng */}
      <div className="hidden md:block">
        <CarouselPrevious className="-left-4 lg:-left-12" />
        <CarouselNext className="-right-4 lg:-right-12" />
      </div>
    </Carousel>
  );
}