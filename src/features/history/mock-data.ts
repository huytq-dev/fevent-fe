import { BookingEvent, HistoryStats } from "./types";

export const MOCK_STATS: HistoryStats = {
  totalEvents: 12,
  upcoming: 2,
  completed: 10,
};

export const MOCK_BOOKINGS: BookingEvent[] = [
  {
    id: "1",
    title: "AI Workshop: Future of Tech",
    location: "Hall B, FPT University",
    timeRange: "14:00 PM - 16:00 PM",
    date: "Oct 24",
    registeredAt: "Oct 10",
    status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Student Career Fair 2023",
    location: "Main Auditorium, FPT University",
    timeRange: "09:00 AM - 17:00 PM",
    date: "Oct 28",
    registeredAt: "Oct 15",
    status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Intro to Web Development",
    location: "Lab 204, FPT University",
    timeRange: "Completed on Sep 15, 2023",
    date: "Sep 15",
    registeredAt: "Sep 01",
    status: "Attended",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Digital Art Seminar",
    location: "Online (Zoom)",
    timeRange: "Aug 20, 2023 - 10:00 AM",
    date: "Aug 20",
    registeredAt: "Aug 05",
    status: "Missed",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=200&auto=format&fit=crop",
  },
];