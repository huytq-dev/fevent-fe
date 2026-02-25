"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormValues, profileSchema } from "@/features/profile/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserProfile } from "../types";

interface EditProfileModalProps {
  profile: UserProfile;
  children: React.ReactNode;
}

export function EditProfileModal({ profile, children }: EditProfileModalProps) {
  const [open, setOpen] = useState(false);

  // Helper convert Date object sang string "YYYY-MM-DD" cho input type="date"
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().split('T')[0];
  };

  const {
    register,
    control, 
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      phone: profile.phone,
      address: profile.address || "", 
      dob: formatDate(profile.dob),   
      gender: profile.gender as "Male" | "Female" | "Other" | undefined || undefined,
      facebook: profile.socials?.facebook || "",
      linkedin: profile.socials?.linkedin || "",
      github: profile.socials?.github || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    // Lưu ý: Khi gửi về API C#, bạn cần map lại đúng field name
    // Ví dụ: data.name -> FullName, data.dob -> DOB
    console.log("Submitting:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cá nhân của bạn.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          
          {/* --- Section 1: Read-Only Info (Identity) --- */}
          <div className="space-y-4 rounded-lg bg-slate-50 p-4 border">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Định danh (Chỉ đọc)</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Mã sinh viên</Label>
                <div className="font-medium text-sm">{profile.studentId}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs">Email sinh viên</Label>
                <div className="font-medium text-sm">{profile.email}</div>
              </div>
            </div>
          </div>

          {/* --- Section 2: Basic Info --- */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Thông tin cơ bản</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="name">Họ tên <span className="text-red-500">*</span></Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" {...register("phone")} />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Ngày sinh</Label>
                <Input id="dob" type="date" {...register("dob")} />
                {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Giới tính</Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Nam</SelectItem>
                        <SelectItem value="Female">Nữ</SelectItem>
                        <SelectItem value="Other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea 
                  id="address" 
                  className="resize-none" 
                  rows={2} 
                  {...register("address")} 
                  placeholder="Địa chỉ hiện tại của bạn..."
                />
              </div>
            </div>
          </div>

          {/* --- Section 3: Socials (CẢNH BÁO: Backend chưa có) --- */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tài khoản mạng xã hội</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="facebook" className="text-right text-xs">Facebook <span className="text-red-500">*</span></Label>
                <Input id="facebook" className="col-span-3 h-8" placeholder="https://facebook.com/..." {...register("facebook")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkedin" className="text-right text-xs">LinkedIn <span className="text-red-500">*</span></Label>
                <Input id="linkedin" className="col-span-3 h-8" placeholder="https://linkedin.com/in/..." {...register("linkedin")} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="github" className="text-right text-xs">GitHub <span className="text-red-500">*</span></Label>
                <Input id="github" className="col-span-3 h-8" placeholder="https://github.com/..." {...register("github")} />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground text-right">*Liên kết mạng xã hội cần cập nhật backend</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
