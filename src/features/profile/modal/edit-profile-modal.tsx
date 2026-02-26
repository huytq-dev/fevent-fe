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
import { userService } from "@/services/UserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserProfile } from "../types";
import type { UserProfileResponse } from "@/features/profile/types";

interface EditProfileModalProps {
  profile: UserProfile;
  onProfileUpdated?: (data: UserProfileResponse) => void;
  children: React.ReactNode;
}

export function EditProfileModal({ profile, onProfileUpdated, children }: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const SOCIAL_PLATFORMS = [
    { value: 1, label: "Facebook" },
    { value: 2, label: "LinkedIn" },
    { value: 3, label: "Github" },
    { value: 4, label: "Website" },
    { value: 5, label: "Khác" },
  ] as const;

  // Helper convert Date object sang string "YYYY-MM-DD" cho input type="date"
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().split('T')[0];
  };

  const normalizedPhone = profile.phone === "Chưa cập nhật" ? "" : profile.phone;
  const normalizedAddress = profile.address === "Chưa cập nhật" ? "" : profile.address || "";
  const normalizedMajor = profile.major === "Chưa cập nhật" ? "" : profile.major;
  const normalizedGender =
    profile.gender === "Chưa cập nhật" ? undefined : (profile.gender as "Male" | "Female" | "Other" | undefined);
  const initialDob = formatDate(profile.dob);
  const initialSocialLinks = profile.socialLinks || [];

  const initialValues = useMemo(
    () => ({
      name: profile.name,
      major: normalizedMajor,
      phone: normalizedPhone,
      address: normalizedAddress,
      dob: initialDob,
      gender: normalizedGender,
      facebook: profile.socials?.facebook || "",
      linkedin: profile.socials?.linkedin || "",
      github: profile.socials?.github || "",
      socialLinks: initialSocialLinks,
    }),
    [
      profile.name,
      normalizedMajor,
      normalizedPhone,
      normalizedAddress,
      initialDob,
      normalizedGender,
      profile.socials?.facebook,
      profile.socials?.linkedin,
      profile.socials?.github,
      initialSocialLinks,
    ],
  );

  const {
    register,
    control, 
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  useEffect(() => {
    if (open) {
      reset(initialValues);
    }
  }, [open, reset, initialValues]);

  const onSubmit = async (data: ProfileFormValues) => {
    const payload: {
      fullName?: string;
      phoneNumber?: string | null;
      major?: string | null;
      address?: string | null;
      dob?: string | null;
      gender?: string | null;
      socialLinks?: Array<{ platform: number; url: string }>;
    } = {};

    if (data.name !== profile.name) payload.fullName = data.name;
    if (data.phone !== normalizedPhone) payload.phoneNumber = data.phone === "" ? "" : data.phone;
    if (data.major !== normalizedMajor) payload.major = data.major === "" ? "" : data.major || "";
    if (data.address !== normalizedAddress) payload.address = data.address === "" ? "" : data.address;
    if (data.dob && data.dob !== initialDob) payload.dob = data.dob;
    if (data.gender !== normalizedGender && data.gender) payload.gender = data.gender;
    if (JSON.stringify(data.socialLinks || []) !== JSON.stringify(initialSocialLinks)) {
      payload.socialLinks = data.socialLinks || [];
    }

    if (Object.keys(payload).length === 0) {
      toast.info("Không có thay đổi để cập nhật.");
      setOpen(false);
      return;
    }

    try {
      const response = await userService.updateProfile(payload);
      if (response.isSuccess && response.statusCode === 200 && response.data) {
        toast.success(response.message || "Cập nhật hồ sơ thành công.");
        onProfileUpdated?.(response.data);
        setOpen(false);
      } else {
        toast.error(response.message || "Cập nhật hồ sơ thất bại.");
      }
    } catch (error) {
      console.error("Update profile failed:", error);
      toast.error("Cập nhật hồ sơ thất bại.");
    }
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

              <div className="space-y-2 col-span-2">
                <Label htmlFor="major">Chuyên ngành</Label>
                <Input id="major" {...register("major")} />
                {errors.major && <p className="text-red-500 text-xs">{errors.major.message}</p>}
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

          {/* --- Section 3: Social Links --- */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tài khoản mạng xã hội</h3>
              <Button
                type="button"
                variant="outline"
                className="h-8 px-3 text-xs"
                disabled={fields.length >= 3}
                onClick={() => append({ platform: 1, url: "" })}
              >
                Thêm liên kết
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">Chưa có liên kết nào. Hãy thêm tối đa 3 liên kết.</p>
            )}

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 items-center gap-3">
                  <div className="col-span-4">
                    <Controller
                      name={`socialLinks.${index}.platform`}
                      control={control}
                      render={({ field: platformField }) => (
                        <Select
                          onValueChange={(value) => platformField.onChange(Number(value))}
                          defaultValue={String(platformField.value ?? 1)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn nền tảng" />
                          </SelectTrigger>
                          <SelectContent>
                            {SOCIAL_PLATFORMS.map((p) => (
                              <SelectItem key={p.value} value={String(p.value)}>
                                {p.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="col-span-7">
                    <Input
                      placeholder="https://..."
                      {...register(`socialLinks.${index}.url` as const)}
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => remove(index)}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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

