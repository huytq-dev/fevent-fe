"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, Download, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import QRCode from "react-qr-code";
import { useState } from "react";
import { BookingEvent } from "../../types";

// Giả lập thông tin User (Sau này lấy từ AuthContext)
const MOCK_USER = {
  name: "Nguyễn Văn A",
  studentId: "SE150000",
};

interface TicketModalProps {
  event: BookingEvent;
  children: React.ReactNode;
}

export function TicketModal({ event, children }: TicketModalProps) {
  const [open, setOpen] = useState(false);
  
  // Dữ liệu để mã hóa vào QR (thường là Ticket ID hoặc Booking ID)
  const qrValue = JSON.stringify({
    ticketId: event.id,
    studentId: MOCK_USER.studentId,
    eventId: event.id
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      {/* Dialog Content trong suốt để custom giao diện vé */}
      <DialogContent className="max-w-[400px] p-0 bg-transparent border-none shadow-none text-black">
        
        {/* --- TICKET CONTAINER --- */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          
          {/* 1. HEADER IMAGE & BADGE */}
          <div className="relative h-40 w-full">
            <Image 
              src={event.thumbnail} 
              alt={event.title} 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="bg-orange-500 text-xs font-bold px-2 py-1 rounded text-white mb-2 inline-block">
                    Vé tiêu chuẩn
                </span>
                <h3 className="font-bold text-lg leading-tight line-clamp-2">{event.title}</h3>
            </div>
          </div>

          {/* 2. EVENT DETAILS */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Ngày
                    </p>
                    <p className="font-semibold text-sm">{event.date}, 2023</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Giờ
                    </p>
                    <p className="font-semibold text-sm">{event.timeRange.split("-")[0]}</p>
                </div>
                <div className="col-span-2 space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Địa điểm
                    </p>
                    <p className="font-semibold text-sm line-clamp-1">{event.location}</p>
                </div>
            </div>
          </div>

          {/* --- TEAR-OFF LINE (Đường cắt vé) --- */}
          <div className="relative flex items-center justify-between">
             <div className="w-6 h-6 bg-gray-500/50 rounded-full -ml-3" /> {/* Left notch */}
             <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2" />
             <div className="w-6 h-6 bg-gray-500/50 rounded-full -mr-3" /> {/* Right notch */}
          </div>

          {/* 3. QR CODE AREA */}
          <div className="p-6 bg-white flex flex-col items-center justify-center space-y-4">
             <div className="p-2 border-2 border-orange-500 rounded-xl">
                 <QRCode 
                    value={qrValue} 
                    size={180} 
                    level="H" 
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                 />
             </div>
             
             <div className="text-center">
                 <p className="text-xs text-muted-foreground uppercase tracking-widest">Mã vé</p>
                 <p className="font-mono font-bold text-lg tracking-wider text-orange-600">
                    #{event.id.padStart(8, '0')}
                 </p>
             </div>

             <div className="text-center bg-gray-50 w-full py-2 rounded-lg">
                 <p className="text-xs text-gray-500">Người sở hữu</p>
                 <p className="font-bold text-sm">{MOCK_USER.name} <span className="text-gray-400">|</span> {MOCK_USER.studentId}</p>
             </div>
          </div>

          {/* 4. FOOTER ACTIONS */}
          <div className="bg-gray-50 p-4 grid grid-cols-2 gap-3 border-t">
              <Button variant="outline" className="w-full text-xs h-9">
                  <Share2 className="w-3 h-3 mr-2" /> Chia sẻ
              </Button>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-xs h-9">
                  <Download className="w-3 h-3 mr-2" /> Lưu ảnh
              </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}