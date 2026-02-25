export interface Speaker {
  id: string
  name: string
  role: string
  avatar: string
  company?: string
}

export interface ScheduleItem {
  time: string
  title: string
  description?: string
}

export interface EventSummary {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  startTime: string
  endTime: string
  maxParticipants: number
  registeredCount: number
  status: number
  isPrivate: boolean
  categoryId: string
  categoryName: string
  locationId: string
  locationName: string
  organizerId: string
  clubId?: string
  createdAt: string
}

export interface EventDetailResponse {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  startTime: string
  endTime: string
  maxParticipants: number
  registeredCount: number
  status: number
  isPrivate: boolean
  categoryId: string
  categoryName: string
  locationId: string
  locationName: string
  locationAddress?: string
  locationMapUrl?: string
  organizerId: string
  organizerName: string
  organizerAvatarUrl?: string
  clubId?: string
  createdAt: string
}

export interface EventDetail {
  id: string
  title: string
  date: string
  timeRange: string
  location: string
  locationMapUrl?: string
  description: string
  price: number
  totalSeats: number
  registeredSeats: number
  image: string
  tags: string[]
  takeaways?: string[]
  schedule: ScheduleItem[]
  speakers: Speaker[]
  host: {
    name: string
    avatar: string
  }
}
