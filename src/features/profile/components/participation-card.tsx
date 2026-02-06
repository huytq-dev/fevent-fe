import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserProfile } from "../types"

export function ParticipationCard({ stats }: { stats: UserProfile["stats"] }) {
  return (
    <Card className="relative overflow-hidden border-none bg-orange-500 text-white shadow-md">
      <div className="absolute right-0 top-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      <CardHeader className="pb-2">
        <CardTitle className="text-base">Participation</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 mt-2 grid grid-cols-2 gap-4">
        <div className="text-center border-r border-white/20">
          <p className="text-3xl font-bold">{stats.eventsAttended}</p>
          <p className="mt-1 text-xs text-white/80">Events Attended</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">{stats.clubsJoined}</p>
          <p className="mt-1 text-xs text-white/80">Clubs Joined</p>
        </div>
      </CardContent>
    </Card>
  )
}
