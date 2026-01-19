"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const LOCATIONS = [
  { value: "hl", label: "FPT Hòa Lạc" },
  { value: "hcm", label: "FPT TP.HCM" },
  { value: "dn", label: "FPT Đà Nẵng" },
  { value: "ct", label: "FPT Cần Thơ" },
  { value: "qn", label: "FPT Quy Nhơn" },
];

const CATEGORIES = [
  { value: "ws", label: "Workshop" },
  { value: "sm", label: "Seminar" },
  { value: "ent", label: "Văn nghệ" },
  { value: "sport", label: "Thể thao" },
];

export function HomeSearch() {
  return (
    <Card className="max-w-4xl mx-auto shadow-xl border-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <form
        className="flex flex-col md:flex-row gap-3 p-2 md:p-4"
        onSubmit={(event) => event.preventDefault()}
      >

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm tên sự kiện, workshop..."
            className="pl-9 h-11"
          />
        </div>

        <Select>
          <SelectTrigger className="h-11 w-full md:w-[160px]">
            <SelectValue placeholder="Địa điểm" />
          </SelectTrigger>
          <SelectContent>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc.value} value={loc.value}>
                {loc.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Select Categories */}
        <Select>
          <SelectTrigger className="h-11 w-full md:w-[140px]">
            <SelectValue placeholder="Thể loại" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Button */}
        <Button className="h-11 shrink-0 bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90">
          Tìm kiếm
        </Button>
      </form>
    </Card>
  );
}
