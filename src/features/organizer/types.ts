export type OrganizerEventStatus = "draft" | "published" | "cancelled" | "ended"

export interface OrganizerEvent {
  id: string
  title: string
  category: string
  location: string
  startTime: string
  endTime: string
  status: OrganizerEventStatus
  capacity: number
  registeredCount: number
  coverUrl?: string | null
}

export type CheckInStatus = "pending" | "checked-in" | "cancelled"

export interface OrganizerParticipant {
  id: string
  name: string
  email: string
  phone?: string | null
  ticketCode: string
  registeredAt: string
  checkedInAt?: string | null
  status: CheckInStatus
}

export interface OrganizerStats {
  totalEvents: number
  activeEvents: number
  totalParticipants: number
  checkInRate: number
}
