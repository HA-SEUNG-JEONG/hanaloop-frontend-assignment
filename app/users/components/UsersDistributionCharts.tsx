/**
 * 사용자 분포 차트 컴포넌트
 *
 * 가정:
 * - 역할별과 국가별 사용자 분포를 시각화해야 함
 * - 퍼센티지와 절대 수치를 모두 표시해야 함
 * - 반응형 레이아웃이 필요함
 *
 * 디자인 의사결정:
 * - 미니멀 디자인으로 시각적 복잡성 감소
 * - 수치 중심의 정보 계층구조 (수치 > 퍼센티지 > 라벨)
 * - 리스트 기반 레이아웃으로 가독성 향상
 * - 구분선으로 항목 분리
 */

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { User, UserRole } from "@/app/types";

interface UsersDistributionChartsProps {
  users: User[];
}

export function UsersDistributionCharts({
  users
}: UsersDistributionChartsProps) {
  const totalUsers = users.length;

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "관리자":
        return "destructive";
      case "감사자":
        return "default";
      default:
        return "secondary";
    }
  };

  // 역할별 분포
  const roleDistribution = ["관리자", "감사자", "사용자"].map((role) => {
    const count = users.filter((user) => user.role === role).length;
    const percentage = totalUsers > 0 ? (count / totalUsers) * 100 : 0;
    return { role: role as UserRole, count, percentage };
  });

  // 국가별 분포
  const countryDistribution = Array.from(
    new Set(users.map((user) => user.country))
  )
    .map((country) => {
      const count = users.filter((user) => user.country === country).length;
      const percentage = totalUsers > 0 ? (count / totalUsers) * 100 : 0;
      return { country, count, percentage };
    })
    .sort((a, b) => b.count - a.count);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 역할별 사용자 분포 */}
      <Card>
        <CardHeader>
          <CardTitle>역할별 사용자 분포</CardTitle>
          <CardDescription>사용자 역할별 통계</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {roleDistribution.map(({ role, count, percentage }, index) => (
              <div key={role}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={getRoleBadgeVariant(role)}
                      className="text-xs"
                    >
                      {role}
                    </Badge>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-foreground">
                        {count}
                      </span>
                      <span className="text-sm text-muted-foreground">명</span>
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-foreground">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
                {index < roleDistribution.length - 1 && (
                  <div className="border-b border-border" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 국가별 사용자 분포 */}
      <Card>
        <CardHeader>
          <CardTitle>국가별 사용자 분포</CardTitle>
          <CardDescription>사용자 소속 국가별 통계</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {countryDistribution.map(
              ({ country, count, percentage }, index) => (
                <div key={country}>
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs">
                        {country}
                      </Badge>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-bold text-foreground">
                          {count}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          명
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-foreground">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  {index < countryDistribution.length - 1 && (
                    <div className="border-b border-border" />
                  )}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
