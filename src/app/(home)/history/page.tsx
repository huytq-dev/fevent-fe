// src/app/(main)/history/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Download, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookingCard } from "@/features/history/components/booking-card";
import { HistoryStatsCards } from "@/features/history/components/history-stats";
import { registrationService } from "@/services/RegistrationService";
import type { BookingEvent, BookingStatus, HistoryStats } from "@/features/history/types";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const isMountedRef = useRef(true);

  const formatDate = (value: string, withYear = true) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      ...(withYear ? { year: "numeric" } : {}),
    });

  const buildTimeRange = (startTime: string, endTime: string) => {
    const start = new Date(startTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const end = new Date(endTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${start} - ${end}`;
  };

  const mapStatus = (status: number): BookingStatus => {
    if (status === 2) return "Attended";
    if (status === 3) return "Missed";
    if (status === 4) return "Confirmed";
    return "Upcoming";
  };

  const loadRegistrations = useCallback(async () => {
    try {
      const response = await registrationService.getMyRegistrations();
      if (response?.isSuccess && response.data && isMountedRef.current) {
        const mapped = response.data.map((item) => ({
          registrationId: item.id,
          eventId: item.eventId,
          ticketCode: item.ticketCode,
          qrCodeUrl: item.qrCodeUrl,
          title: item.eventTitle,
          location: item.locationName,
          timeRange: buildTimeRange(item.startTime, item.endTime),
          date: formatDate(item.startTime),
          registeredAt: formatDate(item.registeredAt, false),
          status: mapStatus(item.status),
          thumbnail:
            item.eventThumbnailUrl ||
            "https://picsum.photos/seed/fevent-history/600/400",
          price: item.price,
        }));
        setEvents(mapped);
        setError(null);
      } else if (isMountedRef.current) {
        setError(response?.message || "Không thể tải lịch sử đăng ký.");
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError("Không thể tải lịch sử đăng ký.");
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    loadRegistrations();
    return () => {
      isMountedRef.current = false;
    };
  }, [loadRegistrations]);

  // Logic filter đơn giản (Client side)
  const filteredEvents = events.filter((event) => {
    if (activeTab === "all") return true;
    return event.status.toLowerCase() === activeTab;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const stats = useMemo<HistoryStats>(() => {
    const totalEvents = events.length;
    const upcoming = events.filter((event) => event.status === "Upcoming").length;
    const completed = events.filter((event) => event.status === "Attended").length;
    return { totalEvents, upcoming, completed };
  }, [events]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setVisibleCount(4);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container mx-auto py-8 max-w-5xl px-4 md:px-6 space-y-8">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lịch sử đặt vé</h1>
            <p className="text-muted-foreground mt-1">
              Theo dõi lịch sử đặt vé và nhận diện các sự kiện mà bạn đã tham gia.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white gap-2">
              <CalendarIcon className="h-4 w-4" /> Xem lịch
            </Button>
            <Button variant="outline" className="bg-white gap-2">
              <Download className="h-4 w-4" /> Xuất file
            </Button>
          </div>
        </div>

        {/* 2. Stats Section */}
        <HistoryStatsCards stats={stats} />

        {/* 3. Filters & List Section */}
        <div className="space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={handleTabChange}>
              <TabsList className="bg-white border p-1 rounded-full h-auto">
                <TabsTrigger value="all" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Tất cả</TabsTrigger>
                <TabsTrigger value="confirmed" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Đã xác nhận</TabsTrigger>
                <TabsTrigger value="upcoming" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Sắp diễn ra</TabsTrigger>
                <TabsTrigger value="attended" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Đã tham gia</TabsTrigger>
                <TabsTrigger value="missed" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Đã hủy</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Sort & Search (Optional) */}
             <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Sắp xếp theo:</span>
                <span className="font-semibold text-gray-900 cursor-pointer">Mới nhất</span>
             </div>
          </div>

          {/* Event List */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="rounded-lg border border-gray-100 bg-white p-6 text-sm text-gray-500">
                Đang tải lịch sử đăng ký...
              </div>
            ) : error ? (
              <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-sm text-red-600">
                {error}
              </div>
            ) : filteredEvents.length > 0 ? (
              visibleEvents.map((event) => (
                <BookingCard key={event.registrationId} event={event} onCancelled={loadRegistrations} />
              ))
            ) : (
              <div className="text-center py-20 text-gray-400">
                Không tìm thấy sự kiện.
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-4">
            <Button
              variant="ghost"
              className="text-gray-500 font-semibold gap-2"
              disabled={visibleCount >= filteredEvents.length}
              onClick={() => setVisibleCount((prev) => prev + 4)}
            >
               Xem thêm lịch sử <span className="text-xs">▼</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

