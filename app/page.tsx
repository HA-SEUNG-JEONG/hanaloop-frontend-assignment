/**
 * 홈페이지 (대시보드)
 *
 * 가정:
 * - 홈페이지는 전체 시스템의 개요를 보여주는 대시보드
 * - 실시간 데이터와 통계 정보를 표시
 * - 사용자가 다른 페이지로 쉽게 이동할 수 있는 네비게이션 제공
 *
 * 아키텍처 개요:
 * - 데이터 상태: countries, companies, posts 데이터를 통합 관리
 * - 컴포넌트 분리: StatsGrid, TopEmittingCountries, RegionStats, RecentReports, ActionButtons
 * - 로딩/에러 상태: 전역 컴포넌트 활용
 *
 * 렌더링 최적화 노트:
 * - 단순한 데이터 조합이므로 메모이제이션 불필요
 * - 컴포넌트 분리로 불필요한 재렌더링 방지
 */

"use client";

import { useState, useEffect } from "react";
import { fetchCountries, fetchCompanies, fetchPosts } from "@/lib/api";
import { Country, Company, Post } from "./types";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import {
  SkeletonPageLayout,
  SkeletonStatsCard,
  SkeletonCard
} from "@/components/common/SkeletonComponents";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardPageHeader } from "@/components/common/PageHeader";
import { StatsGrid } from "./dashboard/components/StatsGrid";
import { TopEmittingCountries } from "./dashboard/components/TopEmittingCountries";
import { RegionStats } from "./dashboard/components/RegionStats";
import { RecentReportsWidget } from "./dashboard/components/RecentReportsWidget";
import { ActionButtons } from "./dashboard/components/ActionButtons";
import { handleRetry } from "@/lib/helpers/retryUtils";

export default function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const { loadingState, error, setLoadingState, setError } =
    useLoadingState("loading");

  useEffect(() => {
    const loadData = async () => {
      setLoadingState("loading");
      setError(null);

      try {
        const [countriesData, companiesData, postsData] = await Promise.all([
          fetchCountries(),
          fetchCompanies(),
          fetchPosts()
        ]);
        setCountries(countriesData);
        setCompanies(companiesData);
        setPosts(postsData);
        setLoadingState("success");
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        setError(
          error instanceof Error
            ? error.message
            : "데이터를 불러오는 중 오류가 발생했습니다."
        );
        setLoadingState("error");
      }
    };

    loadData();
  }, [setLoadingState, setError]);

  // 마지막 업데이트 시간
  const lastUpdated = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  if (loadingState === "loading") {
    return (
      <SkeletonPageLayout
        title="HanaLoop 배출량 대시보드"
        description="전 세계 국가별 및 기업별 CO₂ 배출량 모니터링"
      >
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
        </section>

        {/* Charts Section Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkeletonCard>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-48 w-full" />
            </div>
          </SkeletonCard>
          <SkeletonCard>
            <div className="space-y-4">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-48 w-full" />
            </div>
          </SkeletonCard>
        </section>

        {/* Recent Reports Skeleton */}
        <section>
          <SkeletonCard>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-3 w-48" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>
          </SkeletonCard>
        </section>
      </SkeletonPageLayout>
    );
  }

  if (loadingState === "error") {
    return (
      <ErrorState
        message={error || "데이터를 불러오는 중 오류가 발생했습니다."}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <DashboardPageHeader lastUpdated={lastUpdated} />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* 요약 통계 */}
        <StatsGrid countries={countries} companies={companies} posts={posts} />

        {/* 차트 섹션 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopEmittingCountries countries={countries} />
          <RegionStats countries={countries} />
        </section>

        {/* 최근 보고서 */}
        <RecentReportsWidget companies={companies} />

        {/* 액션 버튼 */}
        <ActionButtons />
      </div>
    </div>
  );
}
