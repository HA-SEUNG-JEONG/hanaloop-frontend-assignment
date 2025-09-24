"use client";

import { useState, useEffect } from "react";
import { fetchCompanies, fetchPosts } from "../lib/api";
import {
  Company,
  Post,
  CompanyEmissionsData,
  TimeSeriesData,
  ReportsStats
} from "../types";
import { ReportsPageHeader } from "./components/ReportsPageHeader";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { ReportsStatsCards } from "./components/ReportsStatsCards";
import { ReportsChartsSection } from "./components/ReportsChartsSection";
import { CompaniesTable } from "./components/CompaniesTable";
import { ReportsList } from "./components/ReportsList";

export default function ReportsPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        const [companiesData, postsData] = await Promise.all([
          fetchCompanies(),
          fetchPosts()
        ]);
        setCompanies(companiesData);
        setPosts(postsData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <ReportsPageHeader />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <ReportsStatsCards stats={stats} />
        <ReportsChartsSection
          companyEmissionsData={companyEmissionsData}
          timeSeriesData={timeSeriesData}
        />
        <CompaniesTable companyEmissionsData={companyEmissionsData} />
        <ReportsList posts={posts} companies={companies} />
      </div>
    </div>
  );
}
