"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, Download, Loader2, MapPin } from "lucide-react";
import QRCode from "react-qr-code";
import { useContext, useRef, useState } from "react";
import { toast } from "sonner";
import { BookingEvent } from "../../types";
import { AuthContext } from "@/providers/AuthProvider";
import { toPng } from "html-to-image"; // <-- Import thư viện mới

interface TicketModalProps {
  event: BookingEvent;
  children: React.ReactNode;
}

export function TicketModal({ event, children }: TicketModalProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const auth = useContext(AuthContext);
  const user = auth?.user;
  
  const qrValue = event.ticketCode || event.registrationId;
  const ownerName = user?.name?.trim() || null;
  const ownerEmail = user?.email?.trim() || null;
  const ownerDisplay = ownerName || ownerEmail || "Người dùng";
  const safeTitle = (event.title || "ticket")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");

  const handleSaveImage = async () => {
    if (!ticketRef.current || isSaving) return;
    setIsSaving(true);
    
    try {
      // Dùng html-to-image gọn gàng và chuẩn xác hơn rất nhiều
      const dataUrl = await toPng(ticketRef.current, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2, // Giữ độ nét cao (nhân đôi pixel)
        style: {
          transform: "scale(1)", // Đảm bảo không bị méo khi chụp
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `ve-${safeTitle}.png`;
      link.click();
      toast.success("Đã lưu ảnh vé");
    } catch (error) {
      console.error("Save ticket image failed:", error);
      toast.error("Lưu ảnh vé thất bại");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      <DialogContent className="max-w-[400px] p-0 bg-transparent border-none shadow-none text-black">
        
        {/* --- TICKET CONTAINER --- */}
        <div
          ref={ticketRef}
          id="ticket-capture"
          className="bg-white rounded-3xl overflow-hidden shadow-2xl w-[350px] sm:w-[400px] mx-auto flex flex-col"
        >
          
          {/* 1. THÔNG TIN TIÊU ĐỀ SỰ KIỆN */}
          <div className="p-6 pb-2 text-center bg-white border-b border-gray-100">
             <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                 Vé tiêu chuẩn
             </span>
             <h3 className="font-bold text-xl leading-tight text-gray-900">{event.title}</h3>
          </div>

          {/* 2. EVENT DETAILS */}
          <div className="p-6 space-y-4 bg-white">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Ngày
                    </p>
                    <p className="font-semibold text-sm">{event.date}</p>
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
                    <p className="font-semibold text-sm wrap-break-words">{event.location}</p>
                </div>
            </div>
          </div>

          {/* --- TEAR-OFF LINE (Đường cắt vé) --- */}
          <div className="relative flex items-center justify-between bg-white">
             <div className="w-6 h-6 bg-gray-500/50 rounded-full -ml-3" />
             <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2" />
             <div className="w-6 h-6 bg-gray-500/50 rounded-full -mr-3" />
          </div>

          {/* 3. QR CODE AREA */}
           <div className="p-6 bg-white flex flex-col items-center justify-center space-y-4 flex-1">
              <div className="p-2 border-2 border-orange-500 rounded-xl bg-white flex items-center justify-center">
                  {event.qrCodeUrl ? (
                    <img
                      src={event.qrCodeUrl}
                      alt="QR Code"
                      width={360}
                      height={360}
                      crossOrigin="anonymous"
                      style={{ width: 180, height: 180, display: "block" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 180,
                        height: 180,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <QRCode 
                         value={qrValue} 
                         size={360} 
                         level="H" 
                         fgColor="#000000"
                         bgColor="#FFFFFF"
                         style={{ width: "180px", height: "180px" }}
                      />
                    </div>
                  )}
              </div>
              
             <div className="text-center">
                 <p className="text-xs text-muted-foreground uppercase tracking-widest">Mã vé</p>
                  <p className="font-mono font-bold text-lg tracking-wider text-orange-600">
                      {event.ticketCode
                        ? `#${event.ticketCode}`
                        : `#${event.registrationId.padStart(8, '0')}`}
                  </p>
             </div>

              <div className="text-center bg-gray-50 w-full py-2 rounded-lg">
                  <p className="text-xs text-gray-500">Người sở hữu</p>
                  <p className="font-bold text-sm">
                    {ownerDisplay}
                    {ownerName && ownerEmail ? (
                      <>
                        {" "}<span className="text-gray-400">|</span>{" "}{ownerEmail}
                      </>
                    ) : null}
                  </p>
              </div>
          </div>

          {/* 4. FOOTER ACTIONS */}
          {/* Vùng này sẽ không xuất hiện trong ảnh được tải về */}
          <div className="bg-gray-50 p-4 grid grid-cols-1 gap-3 border-t">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-xs h-9"
                onClick={handleSaveImage}
                disabled={isSaving}
                data-html2canvas-ignore="true" // Cho html2canvas nếu bạn vẫn dùng
                style={{ visibility: isSaving ? "hidden" : "visible" }} // Mẹo nhỏ để ẩn nút khi dùng html-to-image
              >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" /> Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3 mr-2" /> Lưu ảnh
                    </>
                  )}
              </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
