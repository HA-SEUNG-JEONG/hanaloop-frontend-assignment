"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchCountries, fetchCompanies, fetchPosts } from "./lib/api";
import { Country, Company, Post } from "./types";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { StatsGrid } from "./dashboard/StatsGrid";
import { TopEmittingCountries } from "./dashboard/TopEmittingCountries";
import { RegionStats } from "./dashboard/RegionStats";
import { RecentReports } from "./dashboard/RecentReports";
import { ActionButtons } from "./dashboard/ActionButtons";

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
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

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
      setLastUpdated(new Date().toLocaleString("ko-KR"));
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

  if (loadingState === "loading") {
    return <LoadingSpinner message="대시보드 데이터를 불러오는 중..." />;
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
        <DashboardHeader
          title="HanaLoop 배출량 대시보드"
          description="전 세계 국가별 및 기업별 CO₂ 배출량 모니터링"
        />
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
      <DashboardHeader
        title="HanaLoop 배출량 대시보드"
        description="전 세계 국가별 및 기업별 CO₂ 배출량 모니터링"
        lastUpdated={lastUpdated || undefined}
      />

      <main
        className="container mx-auto px-4 py-8 space-y-8 animate-fade-in"
        role="main"
      >
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
