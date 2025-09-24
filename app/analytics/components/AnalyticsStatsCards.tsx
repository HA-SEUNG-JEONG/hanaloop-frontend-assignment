/**
 * Analytics 페이지용 통계 카드 컴포넌트
 *
 * 공통 StatsCards 컴포넌트를 사용하여 Analytics 특화 데이터를 표시
 */

import { StatsCards, StatCardData } from "@/components/common/StatsCards";
import { Globe, TrendingUp, Users, Building2 } from "lucide-react";

interface AnalyticsStatsCardsProps {
  totalEmissions: number;
  avgEmissions: number;
  maxEmissions: number;
  minEmissions: number;
}

export function AnalyticsStatsCards({
  totalEmissions,
  avgEmissions,
  maxEmissions,
  minEmissions
}: AnalyticsStatsCardsProps) {
  const stats: StatCardData[] = [
    {
      title: "총 배출량",
      value: `${totalEmissions.toFixed(0)}M`,
      icon: Globe,
      description: "백만 톤 CO₂"
    },
    {
      title: "평균 배출량",
      value: `${avgEmissions.toFixed(0)}M`,
      icon: TrendingUp,
      description: "백만 톤 CO₂"
    },
    {
      title: "최대 배출량",
      value: `${maxEmissions.toFixed(0)}M`,
      icon: Building2,
      description: "백만 톤 CO₂"
    },
    {
      title: "최소 배출량",
      value: `${minEmissions.toFixed(0)}M`,
      icon: Users,
      description: "백만 톤 CO₂"
    }
  ];

  return <StatsCards stats={stats} />;
}
