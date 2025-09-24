/**
 * 통계 카드 컴포넌트
 *
 * 디자인 의사결정:
 * - 일관된 카드 레이아웃으로 정보 전달
 * - 아이콘과 색상을 통한 시각적 구분
 * - 반응형 그리드 레이아웃
 * - 재사용 가능한 범용 컴포넌트
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// 통계 카드 데이터 타입
export interface StatCardData {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  isLoading?: boolean;
}

interface StatsCardsProps {
  stats: StatCardData[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon;

        if (stat.isLoading) {
          return (
            <Card key={stat.title} className="animate-pulse">
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
            key={stat.title}
            className={cn(
              "group hover:shadow-md transition-all duration-200 hover:scale-[1.02]",
              "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            )}
            role="region"
            aria-labelledby={`stats-${stat.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle
                id={`stats-${stat.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-foreground"
              >
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <IconComponent
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground tabular-nums">
                  {stat.value}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  {stat.trend && (
                    <div
                      className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        stat.trend.isPositive
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      <span className="text-xs">
                        {stat.trend.isPositive ? "↗" : "↘"}
                      </span>
                      <span>{stat.trend.value}%</span>
                    </div>
                  )}
                </div>
                {stat.trend && (
                  <p className="text-xs text-muted-foreground">
                    {stat.trend.label}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
