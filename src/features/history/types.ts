export type BookingStatus = 'Upcoming' | 'Attended' | 'Missed';

export interface BookingEvent {
  id: string;
  title: string;
  location: string;
  timeRange: string;
  date: string;         // Ví dụ: "Oct 24"
  registeredAt: string; // Ví dụ: "Registered on Oct 10"
  status: BookingStatus;
  thumbnail: string;
  price?: number;
}

export interface HistoryStats {
  totalEvents: number;
  upcoming: number;
  completed: number;
}