"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { registrationService } from "@/services/RegistrationService";
import { useState } from "react";
import { toast } from "sonner";

interface CancelModalProps {
  registrationId: string;
  children: React.ReactNode;
  onCancelled?: () => void;
}

export function CancelModal({ registrationId, children, onCancelled }: CancelModalProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await registrationService.cancel(registrationId, reason);
      if (response?.isSuccess) {
        toast.success("Hủy vé thành công");
        setOpen(false);
        setReason("");
        onCancelled?.();
      } else {
        toast.error("Hủy vé thất bại");
      }
    } catch (error: any) {
      toast.error("Hủy vé thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Hủy đặt vé</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Vui lòng cho biết lý do hủy (không bắt buộc).
          </p>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Nhập lý do hủy..."
            maxLength={500}
            className="min-h-[120px]"
          />
          <p className="text-xs text-muted-foreground text-right">
            {reason.length}/500
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Đóng
          </Button>
          <Button
            className="bg-orange-500 hover:bg-orange-600"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang hủy..." : "Xác nhận hủy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

