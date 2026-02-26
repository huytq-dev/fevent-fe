import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import type { UserProfile } from "../types"

export function AcademicInfoCard({ profile }: { profile: UserProfile }) {
  return (
    <Card className="h-full border-none shadow-sm ring-1 ring-gray-200">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <div className="rounded-lg bg-orange-100 p-2">
          <BookOpen className="h-5 w-5 text-orange-600" />
        </div>
        <CardTitle className="text-lg">Thông tin học tập</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <InfoItem label="Chuyên ngành" value={profile.major} isBold />
          <InfoItem label="Email" value={profile.email} isBold />
          <InfoItem label="Trường" value={profile.campus} isBold />
          {/* <InfoItem label="Năm học" value={profile.academicYear} isBold /> */}
          <InfoItem label="Ngày sinh" value={profile.dob} isBold />
          <InfoItem label="Số điện thoại" value={profile.phone} isBold />
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({
  label,
  value,
  isBold,
}: {
  label: string
  value: string
  isBold?: boolean
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={isBold ? "text-sm font-semibold text-gray-900" : "text-sm text-gray-700"}>
        {value}
      </p>
    </div>
  )
}
