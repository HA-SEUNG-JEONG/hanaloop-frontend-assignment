import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
  isLoading?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  isLoading = false
}: StatsCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("animate-pulse", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-4 w-4 bg-muted rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-muted rounded w-16 mb-2"></div>
          <div className="h-3 bg-muted rounded w-20"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group hover:shadow-md transition-all duration-200 hover:scale-[1.02]",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        className
      )}
      role="region"
      aria-labelledby={`stats-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          id={`stats-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-sm font-medium text-foreground"
        >
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground tabular-nums">
            {value}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{description}</p>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                <span className="text-xs">{trend.isPositive ? "↗" : "↘"}</span>
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
          {trend && (
            <p className="text-xs text-muted-foreground">{trend.label}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
