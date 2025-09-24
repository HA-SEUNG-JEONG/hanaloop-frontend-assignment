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
import { fetchCountries } from "../lib/api";
import { Country } from "../types";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { AnalyticsPageHeader } from "./components/AnalyticsPageHeader";
import { AnalyticsStatsCards } from "./components/AnalyticsStatsCards";
import { AnalyticsChartsSection } from "./components/AnalyticsChartsSection";
import { CountriesTable } from "./components/CountriesTable";

export default function AnalyticsPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setError("데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  // 차트 데이터
  const prepareChartData = () => {
    const barChartData = countries
      .sort((a, b) => b.emissions - a.emissions)
      .slice(0, 10)
      .map((country) => ({
        name: country.name,
        emissions: country.emissions,
        population: country.population / 1000000, // 백만 단위로 변환
        gdp: country.gdp
      }));

    const pieChartData = countries.reduce((acc, country) => {
      const existing = acc.find((item) => item.name === country.region);
      if (existing) {
        existing.value += country.emissions;
      } else {
        acc.push({ name: country.region, value: country.emissions });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

    return { barChartData, pieChartData };
  };

  const chartData = prepareChartData();

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    loadData();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <AnalyticsPageHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <AnalyticsStatsCards {...statsData} />
        <AnalyticsChartsSection {...chartData} />
        <CountriesTable countries={countries} />
      </div>
    </div>
  );
}
