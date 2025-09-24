/**
 * Reports 페이지용 통계 카드 컴포넌트
 * 
 * 공통 StatsCards 컴포넌트를 사용하여 Reports 특화 데이터를 표시
 */

import { StatsCards, StatCardData } from "@/components/common/StatsCards";
import { Building2, TrendingUp, Calendar, FileText } from "lucide-react";
import { ReportsStats } from "../../types";

interface ReportsStatsCardsProps {
  stats: ReportsStats;
}

export function ReportsStatsCards({ stats }: ReportsStatsCardsProps) {
  const statsData: StatCardData[] = [
    {
      title: "등록 기업",
      value: stats.totalCompanies,
      icon: Building2,
      description: "개 기업"
    },
    {
      title: "평균 배출량",
      value: `${stats.avgEmissions.toFixed(0)}`,
      icon: TrendingUp,
      description: "톤 CO₂"
    },
    {
      title: "배출량 증가 기업",
      value: stats.companiesWithIncrease,
      icon: Calendar,
      description: "개 기업"
    },
    {
      title: "제출된 보고서",
      value: stats.totalReports,
      icon: FileText,
      description: "개 보고서"
    }
  ];

  return <StatsCards stats={statsData} />;
}
