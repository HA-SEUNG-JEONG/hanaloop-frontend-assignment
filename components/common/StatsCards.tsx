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

// 통계 카드 데이터 타입
export interface StatCardData {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

interface StatsCardsProps {
  stats: StatCardData[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
