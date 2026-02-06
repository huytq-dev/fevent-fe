// src/app/(main)/history/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Download, Search } from "lucide-react";
import { useState } from "react";
import { BookingCard } from "@/features/history/components/booking-card";
import { HistoryStatsCards } from "@/features/history/components/history-stats";
import { MOCK_BOOKINGS, MOCK_STATS } from "@/features/history/mock-data";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all");

  // Logic filter đơn giản (Client side)
  const filteredEvents = MOCK_BOOKINGS.filter((event) => {
    if (activeTab === "all") return true;
    return event.status.toLowerCase() === activeTab;
  });

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
        <HistoryStatsCards stats={MOCK_STATS} />

        {/* 3. Filters & List Section */}
        <div className="space-y-6">
          
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-white border p-1 rounded-full h-auto">
                <TabsTrigger value="all" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Tất cả</TabsTrigger>
                <TabsTrigger value="upcoming" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Sắp diễn ra</TabsTrigger>
                <TabsTrigger value="attended" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Đã tham gia</TabsTrigger>
                <TabsTrigger value="missed" className="rounded-full px-4 data-[state=active]:bg-black data-[state=active]:text-white">Bỏ qua</TabsTrigger>
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
            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <BookingCard key={event.id} event={event} />
                ))
            ) : (
                <div className="text-center py-20 text-gray-400">Không tìm thấy sự kiện.</div>
            )}
          </div>

          {/* Load More */}
          <div className="flex justify-center pt-4">
            <Button variant="ghost" className="text-gray-500 font-semibold gap-2">
               Xem thêm lịch sử <span className="text-xs">▼</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}