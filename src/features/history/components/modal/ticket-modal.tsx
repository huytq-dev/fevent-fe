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
import Image from "next/image"; // Vẫn giữ import nếu bạn dùng Image cho logo sự kiện/QR url

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
  const safeTitle = (event.title || "ticket")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");

  const handleSaveImage = async () => {
    if (!ticketRef.current || isSaving) return;
    setIsSaving(true);
    const nodeStyleMap = new Map<HTMLElement, Partial<CSSStyleDeclaration>>();
    try {
      const rootNode = ticketRef.current;
      const docEl = document.documentElement;
      const body = document.body;
      const nodes: HTMLElement[] = [
        docEl,
        body,
        rootNode,
        ...Array.from(rootNode.querySelectorAll<HTMLElement>("*")),
      ];
      const hasUnsupported = (value: string) =>
        value.includes("lab") || value.includes("oklch") || value.includes("color-mix");

      nodes.forEach((node) => {
        const style = window.getComputedStyle(node);
        const prev: Partial<CSSStyleDeclaration> = {};

        if (hasUnsupported(style.backgroundColor)) {
          prev.backgroundColor = node.style.backgroundColor;
          node.style.backgroundColor = "rgb(255, 255, 255)";
        }
        if (hasUnsupported(style.color)) {
          prev.color = node.style.color;
          node.style.color = "rgb(0, 0, 0)";
        }
        if (hasUnsupported(style.borderColor)) {
          prev.borderColor = node.style.borderColor;
          node.style.borderColor = "rgb(229, 231, 235)";
        }
        if (hasUnsupported(style.outlineColor)) {
          prev.outlineColor = node.style.outlineColor;
          node.style.outlineColor = "rgb(229, 231, 235)";
        }
        if (hasUnsupported(style.textDecorationColor)) {
          prev.textDecorationColor = node.style.textDecorationColor;
          node.style.textDecorationColor = "rgb(0, 0, 0)";
        }
        if (
          style.backgroundImage &&
          (style.backgroundImage.includes("gradient") ||
            style.backgroundImage.includes("color-mix") ||
            style.backgroundImage.includes("oklch") ||
            style.backgroundImage.includes("lab"))
        ) {
          prev.backgroundImage = node.style.backgroundImage;
          node.style.backgroundImage = "none";
        }

        if (Object.keys(prev).length > 0) {
          nodeStyleMap.set(node, prev);
        }
      });

      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        removeContainer: true,
        onclone: (doc) => {
          const root = doc.getElementById("ticket-capture");
          if (!root) return;
          root.style.backgroundColor = "#ffffff";
          doc.documentElement.style.backgroundColor = "#ffffff";
          doc.body.style.backgroundColor = "#ffffff";
        },
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `ve-${safeTitle || "ticket"}.png`;
      link.click();
      toast.success("Đã lưu ảnh vé");
    } catch (error) {
      console.error("Save ticket image failed:", error);
      toast.error("Lưu ảnh vé thất bại");
    } finally {
      nodeStyleMap.forEach((prevStyles, node) => {
        if (prevStyles.backgroundColor !== undefined) {
          node.style.backgroundColor = prevStyles.backgroundColor;
        }
        if (prevStyles.color !== undefined) {
          node.style.color = prevStyles.color;
        }
        if (prevStyles.borderColor !== undefined) {
          node.style.borderColor = prevStyles.borderColor;
        }
        if (prevStyles.outlineColor !== undefined) {
          node.style.outlineColor = prevStyles.outlineColor;
        }
        if (prevStyles.textDecorationColor !== undefined) {
          node.style.textDecorationColor = prevStyles.textDecorationColor;
        }
        if (prevStyles.backgroundImage !== undefined) {
          node.style.backgroundImage = prevStyles.backgroundImage;
        }
      });
      setIsSaving(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
      {/* Dialog Content trong suốt để custom giao diện vé */}
      <DialogContent className="max-w-[400px] p-0 bg-transparent border-none shadow-none text-black">
        
        {/* --- TICKET CONTAINER --- */}
        <div
          ref={ticketRef}
          id="ticket-capture"
          className="bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          
          {/* 1. THÔNG TIN TIÊU ĐỀ SỰ KIỆN (Đã bỏ ảnh background) */}
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
                    <p className="font-semibold text-sm line-clamp-2">{event.location}</p>
                </div>
            </div>
          </div>

          {/* --- TEAR-OFF LINE (Đường cắt vé) --- */}
          <div className="relative flex items-center justify-between bg-white">
             <div className="w-6 h-6 bg-gray-500/50 rounded-full -ml-3" /> {/* Left notch */}
             <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2" />
             <div className="w-6 h-6 bg-gray-500/50 rounded-full -mr-3" /> {/* Right notch */}
          </div>

          {/* 3. QR CODE AREA */}
           <div className="p-6 bg-white flex flex-col items-center justify-center space-y-4">
              <div className="p-2 border-2 border-orange-500 rounded-xl">
                  {event.qrCodeUrl ? (
                    <Image
                      src={event.qrCodeUrl}
                      alt="QR Code"
                      width={180}
                      height={180}
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <QRCode 
                       value={qrValue} 
                       size={180} 
                       level="H" 
                       fgColor="#000000"
                       bgColor="#FFFFFF"
                    />
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
                    {user?.name || "Người dùng"}
                    {user?.email ? (
                      <>
                        {" "}<span className="text-gray-400">|</span>{" "}{user.email}
                      </>
                    ) : null}
                  </p>
              </div>
          </div>

          {/* 4. FOOTER ACTIONS */}
          <div
            className="bg-gray-50 p-4 grid grid-cols-1 gap-3 border-t"
            data-html2canvas-ignore="true"
          >
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-xs h-9"
                onClick={handleSaveImage}
                disabled={isSaving}
              >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" /> Đang lưu...
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
