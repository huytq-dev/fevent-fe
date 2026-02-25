"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { BookingEvent } from "../../types";
import { feedbackSchema, FeedbackFormValues } from "../../schema";
import { StarRating } from "../../components/star-rating";
import { reviewService } from "@/features/history/services/ReviewService";

interface FeedbackModalProps {
  event: BookingEvent;
  children: React.ReactNode;
}

export function FeedbackModal({ event, children }: FeedbackModalProps) {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    reset,
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      overallRating: 0,
      speakerRating: 0,
      organizationRating: 0,
      contentRating: 0,
      comment: "",
    },
  });

  const commentValue = watch("comment") || "";
  const overallRating = watch("overallRating");

  // Helper text dựa trên số sao
  const getRatingLabel = (score: number) => {
    if (score === 5) return "Excellent!";
    if (score === 4) return "Good";
    if (score === 3) return "Average";
    if (score === 2) return "Poor";
    if (score === 1) return "Terrible";
    return "";
  };

  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      const payload = {
        rating: data.overallRating,
        content: data.comment?.trim() || "",
      };

      const response = await reviewService.create(event.eventId, payload);

      if (response?.isSuccess) {
        toast.success("Gửi đánh giá thành công");
        setOpen(false);
        reset();
      } else {
        toast.error("Gửi đánh giá thất bại");
      }
    } catch (error) {
      console.error("Submit feedback failed:", error);
      toast.error("Gửi đánh giá thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-xl md:text-2xl font-bold">
            How was the {event.title}?
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            We value your feedback to improve future FPT University events.
          </p>
        </DialogHeader>

        {/* 1. Event Summary Card */}
        <div className="mt-4 flex gap-4 rounded-xl border p-4 bg-gray-50/50">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <Badge variant="secondary" className="bg-orange-100 text-orange-600 hover:bg-orange-100 text-[10px] px-2 py-0">
              Technology
            </Badge>
            <h4 className="font-bold text-sm line-clamp-1">{event.title}</h4>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {event.date}, 2023
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {event.location}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-2">
          
          {/* 2. Overall Rating */}
          <div className="flex flex-col items-center space-y-2">
            <Label className="text-base font-semibold">Overall Rating</Label>
            <Controller
              name="overallRating"
              control={control}
              render={({ field }) => (
                <StarRating 
                  value={field.value} 
                  onChange={field.onChange} 
                  size="lg" // Sao to
                />
              )}
            />
            <span className="text-sm font-medium text-orange-500 min-h-[20px]">
              {getRatingLabel(overallRating)}
            </span>
          </div>

          <div className="border-t border-gray-100" />

          {/* 3. Detailed Feedback Grid */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Đánh giá chi tiết</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Speaker Quality */}
              <div className="space-y-2">
                 <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Chất lượng diễn giả</Label>
                    <span className="text-xs font-medium text-gray-400">4/5</span>
                 </div>
                 <Controller
                    name="speakerRating"
                    control={control}
                    render={({ field }) => <StarRating value={field.value} onChange={field.onChange} size="sm" />}
                 />
              </div>

              {/* Organization */}
              <div className="space-y-2">
                 <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Tổ chức</Label>
                    <span className="text-xs font-medium text-gray-400">5/5</span>
                 </div>
                 <Controller
                    name="organizationRating"
                    control={control}
                    render={({ field }) => <StarRating value={field.value} onChange={field.onChange} size="sm" />}
                 />
              </div>

               {/* Content Relevance */}
               <div className="space-y-2">
                 <div className="flex justify-between">
                    <Label className="text-xs text-muted-foreground">Tính liên quan</Label>
                    <span className="text-xs font-medium text-gray-400">3/5</span>
                 </div>
                 <Controller
                    name="contentRating"
                    control={control}
                    render={({ field }) => <StarRating value={field.value} onChange={field.onChange} size="sm" />}
                 />
              </div>

            </div>
          </div>

          {/* 4. Additional Comments */}
          <div className="space-y-2">
            <Label className="font-semibold text-sm">Bình luận thêm</Label>
            <div className="relative">
                <Textarea 
                    placeholder="Chia sẻ kinh nghiệm về không gian, không khí, hoặc điểm nhấn chính..."
                    className="min-h-[100px] bg-gray-50 resize-none pb-6"
                    {...register("comment")}
                />
                <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
                    {commentValue.length}/500
                </span>
            </div>
          </div>

          {/* 5. Footer Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 rounded-full px-8"
                disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
