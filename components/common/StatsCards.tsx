/**
 * 통계 카드 컴포넌트
 *
 * 디자인 의사결정:
 * - 일관된 카드 레이아웃으로 정보 전달
 * - 아이콘과 색상을 통한 시각적 구분
 * - 반응형 그리드 레이아웃
 * - 재사용 가능한 범용 컴포넌트
 * - 실시간 애니메이션 효과 추가
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
  isRealtime?: boolean; // 실시간 업데이트 여부
  animationDelay?: number; // 애니메이션 지연 시간
}

interface StatsCardsProps {
  stats: StatCardData[];
}

// 개별 통계 카드 컴포넌트
function StatCard({ stat, index }: { stat: StatCardData; index: number }) {
  const IconComponent = stat.icon;

  return (
    <Card
      className={cn(
        "group hover-lift transition-all duration-300",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        "animate-fade-in-scale",
        stat.isRealtime && "realtime-highlight"
      )}
      style={{
        animationDelay: `${(stat.animationDelay || 0) + index * 100}ms`
      }}
      role="region"
      aria-labelledby={`stats-${stat.title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          id={`stats-${stat.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-sm font-medium text-foreground"
        >
          {stat.title}
        </CardTitle>
        <div
          className={cn(
            "p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300",
            stat.isRealtime && "animate-pulse-glow"
          )}
        >
          <IconComponent
            className={cn(
              "h-4 w-4 text-primary transition-all duration-300",
              stat.isRealtime && "animate-float"
            )}
            aria-hidden="true"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground tabular-nums">
            {typeof stat.value === "number"
              ? stat.value.toLocaleString()
              : stat.value}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{stat.description}</p>
            {stat.trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.trend.isPositive ? "text-green-600" : "text-red-600"
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
            <p className="text-xs text-muted-foreground">{stat.trend.label}</p>
          )}
          {stat.isRealtime && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>실시간</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} stat={stat} index={index} />
      ))}
    </div>
  );
}
