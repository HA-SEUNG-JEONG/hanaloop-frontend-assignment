/**
 * 통계 카드 컴포넌트
 *
 * 디자인 의사결정:
 * - 일관된 카드 레이아웃으로 정보 전달
 * - 아이콘과 색상을 통한 시각적 구분
 * - 반응형 그리드 레이아웃
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, TrendingUp, Users, Building2 } from "lucide-react";

interface StatsCardsProps {
  totalEmissions: number;
  avgEmissions: number;
  maxEmissions: number;
  minEmissions: number;
}

export function StatsCards({
  totalEmissions,
  avgEmissions,
  maxEmissions,
  minEmissions
}: StatsCardsProps) {
  const stats = [
    {
      title: "총 배출량",
      value: totalEmissions.toFixed(0),
      icon: Globe,
      description: "백만 톤 CO₂"
    },
    {
      title: "평균 배출량",
      value: avgEmissions.toFixed(0),
      icon: TrendingUp,
      description: "백만 톤 CO₂"
    },
    {
      title: "최대 배출량",
      value: maxEmissions.toFixed(0),
      icon: Building2,
      description: "백만 톤 CO₂"
    },
    {
      title: "최소 배출량",
      value: minEmissions.toFixed(0),
      icon: Users,
      description: "백만 톤 CO₂"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <div className="text-2xl font-bold">{stat.value}M</div>
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
