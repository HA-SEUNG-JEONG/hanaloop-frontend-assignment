"use client";

import { useState, useEffect } from "react";
import { fetchCompanies, fetchPosts } from "@/lib/api";
import {
  Company,
  Post,
  CompanyEmissionsData,
  TimeSeriesData,
  ReportsStats
} from "../types";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import { ReportsPageHeader } from "@/components/common/PageHeader";
import { ErrorState } from "@/components/common/ErrorState";
import {
  SkeletonPageLayout,
  SkeletonStatsCard,
  SkeletonCard,
  SkeletonTable,
  SkeletonChart,
  SkeletonList
} from "@/components/common/SkeletonComponents";
import { Skeleton } from "@/components/ui/skeleton";
import { ReportsStatsCards } from "./components/ReportsStatsCards";
import { ChartsSection } from "./components/ChartsSection";
import { CompaniesTable } from "./components/CompaniesTable";
import { ReportsList } from "./components/ReportsList";
import { handleRetry } from "@/lib/helpers/retryUtils";

export default function ReportsPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const { loadingState, error, setLoadingState, setError } =
    useLoadingState("loading");

  useEffect(() => {
    const loadData = async () => {
      setLoadingState("loading");
      setError(null);

      try {
        const [companiesData, postsData] = await Promise.all([
          fetchCompanies(),
          fetchPosts()
        ]);
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

  // 회사별 최신 배출량 데이터
  const companyEmissionsData: CompanyEmissionsData[] = companies.map(
    (company) => {
      const latestEmission = company.emissions[company.emissions.length - 1];
      const previousEmission = company.emissions[company.emissions.length - 2];
      const change = previousEmission
        ? ((latestEmission.emissions - previousEmission.emissions) /
            previousEmission.emissions) *
          100
        : 0;

      return {
        id: company.id,
        name: company.name,
        country: company.country,
        businessType: company.businessType,
        industry: company.industry,
        subsidiaryCount: company.subsidiaries.length,
        latestEmissions: latestEmission?.emissions || 0,
        change: change,
        emissions: company.emissions
      };
    }
  );

  // 시간별 배출량 추이 차트 데이터
  const timeSeriesData: TimeSeriesData[] = companies
    .reduce((acc, company) => {
      company.emissions.forEach((emission) => {
        const existing = acc.find(
          (item) => item.yearMonth === emission.yearMonth
        );
        if (existing) {
          existing.totalEmissions += emission.emissions;
        } else {
          acc.push({
            yearMonth: emission.yearMonth,
            totalEmissions: emission.emissions
          });
        }
      });
      return acc;
    }, [] as TimeSeriesData[])
    .sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

  // 통계 계산
  const stats: ReportsStats = {
    totalCompanies: companies.length,
    totalReports: posts.length,
    avgEmissions:
      companyEmissionsData.reduce(
        (sum, company) => sum + company.latestEmissions,
        0
      ) / companies.length || 0,
    companiesWithIncrease: companyEmissionsData.filter(
      (company) => company.change > 0
    ).length
  };

  if (loadingState === "loading") {
    return (
      <SkeletonPageLayout
        title="보고서 관리"
        description="기업별 배출량 보고서 및 데이터 관리"
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

        {/* Companies Table Skeleton */}
        <section>
          <SkeletonTable rows={8} />
        </section>

        {/* Reports List Skeleton */}
        <section>
          <SkeletonCard>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-3 w-48" />
              </div>
              <SkeletonList items={5} />
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
      <ReportsPageHeader />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <ReportsStatsCards stats={stats} />
        <ChartsSection
          companyEmissionsData={companyEmissionsData}
          timeSeriesData={timeSeriesData}
        />
        <CompaniesTable
          companyEmissionsData={companyEmissionsData}
          onViewDetails={(companyId) => {
            console.log("상세보기:", companyId);
            // TODO: 상세보기 모달 또는 페이지로 이동
          }}
          onEdit={(companyId) => {
            console.log("편집:", companyId);
            // TODO: 편집 모달 또는 페이지로 이동
          }}
        />
        <ReportsList posts={posts} companies={companies} />
      </div>
    </div>
  );
}
