/**
 * 사용자 통계 카드 컴포넌트
 *
 * 공통 StatsCards 컴포넌트를 사용하여 사용자 특화 데이터를 표시
 */

import { StatsCards, StatCardData } from "@/components/common/StatsCards";
import { Users, Shield, UserPlus, Mail } from "lucide-react";
import { UserStats } from "../../types";

interface UsersStatsCardsProps {
  stats: UserStats;
}

export function UsersStatsCards({ stats }: UsersStatsCardsProps) {
  const statsData: StatCardData[] = [
    {
      title: "총 사용자",
      value: stats.totalUsers,
      icon: Users,
      description: "명",
      trend: {
        value: 5.2,
        label: "전월 대비 증가",
        isPositive: true
      }
    },
    {
      title: "활성 사용자",
      value: stats.activeUsers,
      icon: Shield,
      description: "명",
      trend: {
        value: 2.1,
        label: "활성도 증가",
        isPositive: true
      }
    },
    {
      title: "관리자",
      value: stats.adminUsers,
      icon: UserPlus,
      description: "명"
    },
    {
      title: "신규 사용자",
      value: stats.recentUsers,
      icon: Mail,
      description: "최근 30일",
      trend: {
        value: 15.8,
        label: "신규 가입 증가",
        isPositive: true
      }
    }
  ];

  return <StatsCards stats={statsData} />;
}
