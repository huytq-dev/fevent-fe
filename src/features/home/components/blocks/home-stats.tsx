import { CalendarCheck, Trophy, Users, Zap } from "lucide-react";

const STATS = [
  { label: "Sự kiện / năm", value: "500+", icon: CalendarCheck, color: "text-blue-500" },
  { label: "Sinh viên tham gia", value: "15,000+", icon: Users, color: "text-green-500" },
  { label: "CLB hoạt động", value: "45+", icon: Zap, color: "text-orange-500" },
  { label: "Giải thưởng", value: "100+", icon: Trophy, color: "text-yellow-500" },
];

export function HomeStats() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div
              className={`mb-4 rounded-full bg-muted p-3 ${stat.color} bg-opacity-10`}
            >
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
