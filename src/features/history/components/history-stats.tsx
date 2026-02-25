import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, RotateCcw } from "lucide-react";
import { HistoryStats } from "../types";

export function HistoryStatsCards({ stats }: { stats: HistoryStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatItem 
        icon={<Calendar className="h-5 w-5 text-gray-500" />} 
        label="Tổng sự kiện" 
        value={stats.totalEvents} 
      />
      <StatItem 
        icon={<Clock className="h-5 w-5 text-orange-500" />} 
        label="Sắp diễn ra" 
        value={stats.upcoming} 
        isHighlight 
      />
      <StatItem 
        icon={<RotateCcw className="h-5 w-5 text-gray-500" />} 
        label="Đã tham gia" 
        value={stats.completed} 
      />
    </div>
  );
}

function StatItem({ icon, label, value, isHighlight }: any) {
  return (
    <Card className={`border-none shadow-sm ${isHighlight ? 'ring-1 ring-orange-200 bg-white' : 'bg-white'}`}>
      <CardContent className="p-6 flex items-start gap-4">
         {/* Icon Box */}
         <div className={`mt-1`}>{icon}</div>
         <div>
            <p className={`text-sm font-medium ${isHighlight ? 'text-orange-500' : 'text-gray-500'}`}>
                {label}
            </p>
            <h3 className="text-3xl font-bold mt-1">{value}</h3>
         </div>
         {/* Decorative bar for highlight */}
         {isHighlight && (
             <div className="ml-auto w-1 h-12 bg-orange-500 rounded-full"></div>
         )}
      </CardContent>
    </Card>
  )
}
