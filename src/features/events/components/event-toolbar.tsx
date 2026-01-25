"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid as GridIcon, List as ListIcon, Search } from "lucide-react"

interface EventToolbarProps {
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
}

export function EventToolbar({ viewMode, setViewMode }: EventToolbarProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div className="relative flex-1 w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Tìm sự kiện..."
          className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-orange-500"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <span className="text-sm text-gray-500 hidden md:inline-block">
          Hiển thị <span className="font-semibold text-gray-900">28</span> sự kiện
        </span>

        <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>

        <div className="flex items-center bg-gray-100 p-1 rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode("grid")}
            className={`h-7 w-7 rounded-sm transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode("list")}
            className={`h-7 w-7 rounded-sm transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>

        <Select defaultValue="newest">
          <SelectTrigger className="w-[150px] bg-white h-9 border-gray-200 focus:ring-orange-500">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mới nhất trước</SelectItem>
            <SelectItem value="oldest">Cũ nhất trước</SelectItem>
            <SelectItem value="popular">Phổ biến nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
