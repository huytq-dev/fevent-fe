import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EventHeader() {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Sự kiện sắp tới</h1>
          
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Khám phá các workshop, hoạt động câu lạc bộ và hội thảo học thuật đang diễn ra tại các cơ sở của Đại học FPT.
          </p>
        </div>

        <Button size="sm" className="font-semibold shadow-sm bg-orange-600 hover:bg-orange-700 text-white transition-all h-9 px-4 shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Đăng sự kiện
        </Button>
      </div>
    </div>
  )
}