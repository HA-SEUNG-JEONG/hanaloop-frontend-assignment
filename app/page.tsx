"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchCountries, fetchCompanies, fetchPosts } from "@/lib/api";
import { Country, Company, Post } from "./types";
import { DashboardPageHeader } from "@/components/common/PageHeader";
import { ErrorState } from "@/components/common/ErrorState";
import {
  SkeletonPageLayout,
  SkeletonStatsCard,
  SkeletonCard,
  SkeletonList
} from "@/components/common/SkeletonComponents";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsGrid } from "./dashboard/components/StatsGrid";
import { TopEmittingCountries } from "./dashboard/components/TopEmittingCountries";
import { RegionStats } from "./dashboard/components/RegionStats";
import { RecentReports } from "./dashboard/components/RecentReports";
import { ActionButtons } from "./dashboard/components/ActionButtons";
import { RealtimeStatus } from "@/components/common/RealtimeStatus";
import { cn } from "@/lib/utils";

interface DashboardData {
  countries: Country[];
  companies: Company[];
  posts: Post[];
}

type LoadingState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [data, setData] = useState<DashboardData>({
    countries: [],
    companies: [],
    posts: []
  });
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadData = useCallback(async () => {
    setLoadingState("loading");
    setError(null);

    try {
      const [countriesData, companiesData, postsData] = await Promise.all([
        fetchCountries(),
        fetchCompanies(),
        fetchPosts()
      ]);

      setData({
        countries: countriesData,
        companies: companiesData,
        posts: postsData
      });
      setLastUpdated(new Date());
      setLoadingState("success");
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      );
      setLoadingState("error");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 자동 새로고침 설정
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (loadingState === "success") {
        handleRefresh();
      }
    }, 30000); // 30초마다 자동 새로고침

    return () => clearInterval(interval);
  }, [autoRefresh, loadingState]);

  // 메모이제이션을 통한 성능 최적화
  const hasData = useMemo(
    () =>
      data.countries.length > 0 ||
      data.companies.length > 0 ||
      data.posts.length > 0,
    [data]
  );

  const handleRetry = () => {
    loadData();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  if (loadingState === "loading") {
    return (
      <SkeletonPageLayout
        title="HanaLoop 배출량 대시보드"
        description="전 세계 국가별 및 기업별 CO₂ 배출량 모니터링"
      >
        {/* Stats Grid Skeleton */}
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
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SkeletonCard>

          <SkeletonCard>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-3 w-40" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="text-right space-y-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SkeletonCard>
        </section>

        {/* Recent Reports Skeleton */}
        <section>
          <SkeletonCard>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <SkeletonList items={3} />
            </div>
          </SkeletonCard>
        </section>

        {/* Action Buttons Skeleton */}
        <section className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-32" />
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

  // 빈 데이터 상태
  if (!hasData) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <DashboardPageHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              데이터가 없습니다
            </h2>
            <p className="text-muted-foreground">
              현재 표시할 데이터가 없습니다. 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <DashboardPageHeader lastUpdated={lastUpdated?.toLocaleString("ko-KR")} />

      <main
        className="container mx-auto px-4 py-8 space-y-8 animate-fade-in"
        role="main"
      >
        {/* 실시간 상태 표시 */}
        <div className="flex justify-between items-center">
          <RealtimeStatus lastUpdated={lastUpdated} isUpdating={isRefreshing} />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAutoRefresh}
              className={cn(
                "px-3 py-1.5 text-xs rounded-lg border transition-all duration-200",
                "hover:scale-105 active:scale-95",
                autoRefresh
                  ? "bg-green-50 text-green-700 border-green-300"
                  : "bg-gray-50 text-gray-700 border-gray-300"
              )}
            >
              {autoRefresh ? "자동 새로고침 ON" : "자동 새로고침 OFF"}
            </button>
          </div>
        </div>
        <section aria-label="주요 통계" className="animate-slide-up">
          <StatsGrid
            countries={data.countries}
            companies={data.companies}
            posts={data.posts}
          />
        </section>

        <section
          aria-label="국가별 배출량 분석"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <TopEmittingCountries countries={data.countries} />
          <RegionStats countries={data.countries} />
        </section>

        <section
          aria-label="최근 보고서"
          className="animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <RecentReports posts={data.posts} companies={data.companies} />
        </section>

        <section
          aria-label="액션 버튼"
          className="animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <ActionButtons />
        </section>
      </main>
    </div>
  );
}
