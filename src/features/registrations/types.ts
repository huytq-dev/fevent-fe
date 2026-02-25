export interface RegistrationSummaryResponse {
  id: string
  eventId: string
  eventTitle: string
  eventThumbnailUrl?: string
  startTime: string
  endTime: string
  locationName: string
  registeredAt: string
  status: number
  ticketCode: string
  qrCodeUrl?: string
  price: number
}

export interface RegistrationDetailResponse extends RegistrationSummaryResponse {
  locationAddress?: string
  organizerName: string
  organizerAvatarUrl?: string
}
