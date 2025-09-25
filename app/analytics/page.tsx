/**
 * Analytics 페이지
 *
 * 가정:
 * - API에서 받은 데이터는 항상 유효한 형태
 * - 사용자는 로딩 상태를 명확히 인지할 수 있어야 함
 * - 에러 발생 시 적절한 피드백 제공
 *
 * 아키텍처 개요:
 * - 데이터 상태: countries 배열과 loading 상태
 * - 데이터 흐름: API 호출 → 데이터 처리 → 컴포넌트 렌더링
 * - 렌더링 최적화: 단순한 계산이므로 메모이제이션 불필요 (룰 6번)
 */

"use client";

import { useEffect, useState } from "react";
import { fetchCountries } from "@/lib/api";
import { Country } from "../types";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import {
  SkeletonPageLayout,
  SkeletonStatsCard,
  SkeletonTable,
  SkeletonChart
} from "@/components/common/SkeletonComponents";
import { AnalyticsPageHeader } from "@/components/common/PageHeader";
import { AnalyticsStatsCards } from "./components/AnalyticsStatsCards";
import { AnalyticsChartsSection } from "./components/AnalyticsChartsSection";
import { CountriesTable } from "./components/CountriesTable";
import {
  createBarChartData,
  createPieChartData
} from "@/lib/helpers/analyticsUtils";
import { handleRetry } from "@/lib/helpers/retryUtils";

export default function AnalyticsPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const { loadingState, error, setLoadingState, setError } =
    useLoadingState("loading");

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setLoadingState("loading");
      setError(null);

      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData);
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

    loadAnalyticsData();
  }, [setLoadingState, setError]);

  // 데이터 처리 - 단순한 계산이므로 메모이제이션 불필요 (룰 6번)

  // 통계 계산
  const totalEmissions = countries.reduce(
    (sum, country) => sum + country.emissions,
    0
  );
  const avgEmissions = totalEmissions / countries.length;
  const maxEmissions = Math.max(...countries.map((c) => c.emissions));
  const minEmissions = Math.min(...countries.map((c) => c.emissions));

  const statsData = {
    totalEmissions,
    avgEmissions,
    maxEmissions,
    minEmissions
  };

  const barChartData = createBarChartData(countries);
  const pieChartData = createPieChartData(countries);

  if (loadingState === "loading") {
    return (
      <SkeletonPageLayout
        title="분석 대시보드"
        description="국가별 배출량 데이터 분석 및 시각화"
      >
        {/* Stats Cards Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
        </section>

        {/* Charts Section Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkeletonChart />
          <SkeletonChart />
        </section>

        {/* Countries Table Skeleton */}
        <section>
          <SkeletonTable rows={10} />
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
      <AnalyticsPageHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <AnalyticsStatsCards {...statsData} />
        <AnalyticsChartsSection
          barChartData={barChartData}
          pieChartData={pieChartData}
        />
        <CountriesTable countries={countries} />
      </div>
    </div>
  );
}
