"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Download, QrCode, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { ROUTES } from "@/config/routes"
import { ORGANIZER_EVENTS, ORGANIZER_PARTICIPANTS } from "../mock-data"
import type { OrganizerParticipant } from "../types"
import { EventStatusBadge } from "./event-status-badge"
import Link from "next/link"

const statusLabel = (status: OrganizerParticipant["status"]) => {
  switch (status) {
    case "checked-in":
      return "Đã check-in"
    case "cancelled":
      return "Đã hủy"
    default:
      return "Chờ check-in"
  }
}

export function OrganizerParticipants() {
  const [query, setQuery] = useState("")
  const event = ORGANIZER_EVENTS[0]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ORGANIZER_PARTICIPANTS
    return ORGANIZER_PARTICIPANTS.filter((participant) =>
      [participant.name, participant.email, participant.ticketCode]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }, [query])

  const exportList = (type: "csv" | "excel") => {
    toast.success(`Đang xuất danh sách (${type.toUpperCase()})`)
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Danh sách người tham gia</h2>
          <p className="text-sm text-muted-foreground">
            Sự kiện: {event.title}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => exportList("csv")}>
            <Download className="mr-2 h-4 w-4" />
            Xuất CSV
          </Button>
          <Button variant="outline" onClick={() => exportList("excel")}>
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
          <Button asChild>
            <Link href={ROUTES.ORGANIZER_CHECK_IN}>
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">Đã đăng ký</p>
            <p className="mt-2 text-2xl font-semibold">{ORGANIZER_PARTICIPANTS.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">Đã check-in</p>
            <p className="mt-2 text-2xl font-semibold">
              {ORGANIZER_PARTICIPANTS.filter((item) => item.status === "checked-in").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-none bg-transparent">
          <CardContent className="rounded-xl border bg-background p-4">
            <p className="text-xs text-muted-foreground">Tỷ lệ check-in</p>
            <p className="mt-2 text-2xl font-semibold">68%</p>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-xl border bg-background p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm theo tên, email, mã vé"
              className="pl-9"
            />
          </div>
          <EventStatusBadge status={event.status} />
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người tham gia</TableHead>
                <TableHead>Mã vé</TableHead>
                <TableHead>Đăng ký</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>
                    <p className="font-semibold">{participant.name}</p>
                    <p className="text-xs text-muted-foreground">{participant.email}</p>
                  </TableCell>
                  <TableCell className="font-medium">{participant.ticketCode}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(participant.registeredAt).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {participant.checkedInAt
                      ? new Date(participant.checkedInAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--"}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {statusLabel(participant.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}
