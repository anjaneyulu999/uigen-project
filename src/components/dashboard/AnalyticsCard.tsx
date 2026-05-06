import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export function AnalyticsCard({
  label,
  value,
  change,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50",
}: AnalyticsCardProps) {
  const positive = change >= 0;

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{label}</p>
          <p className="mt-1.5 text-2xl font-semibold text-neutral-900 tracking-tight">{value}</p>
        </div>
        <div className={cn("flex items-center justify-center w-9 h-9 rounded-lg shrink-0", iconBg)}>
          <Icon className={cn("h-4.5 w-4.5", iconColor)} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {positive ? (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
        )}
        <span className={cn("text-xs font-medium", positive ? "text-emerald-600" : "text-red-600")}>
          {positive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-neutral-400">vs last month</span>
      </div>
    </div>
  );
}
