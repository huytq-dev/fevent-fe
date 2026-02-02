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

export interface EventDetail {
  id: number
  slug: string
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
