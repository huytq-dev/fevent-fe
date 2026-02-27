"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Camera, CheckCircle2, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function OrganizerCheckIn() {
  const [ticketCode, setTicketCode] = useState("")

  const handleScan = () => {
    if (!ticketCode.trim()) {
      toast.error("Vui lòng nhập mã vé")
      return
    }
    toast.success(`Check-in thành công: ${ticketCode.toUpperCase()}`)
    setTicketCode("")
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="rounded-xl border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Trình quét QR</h2>
              <p className="text-sm text-muted-foreground">
                Dùng camera hoặc nhập mã vé thủ công
              </p>
            </div>
            <Button variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Bật camera
            </Button>
          </div>

          <div className="mt-6 flex h-[320px] items-center justify-center rounded-2xl border border-dashed bg-muted/40">
            <div className="text-center text-muted-foreground">
              <QrCode className="mx-auto h-10 w-10" />
              <p className="mt-3 text-sm">Khu vực hiển thị camera</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="rounded-xl border bg-background p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold">Check-in thủ công</h3>
              <p className="text-sm text-muted-foreground">
                Nhập mã vé từ email hoặc danh sách
              </p>
            </div>
            <Input
              value={ticketCode}
              onChange={(event) => setTicketCode(event.target.value)}
              placeholder="FEV-2026-0001"
            />
            <Button className="w-full" onClick={handleScan}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Xác nhận check-in
            </Button>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              Tip: Bạn có thể dùng QR Scanner trên điện thoại để quét nhanh tại cổng.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
