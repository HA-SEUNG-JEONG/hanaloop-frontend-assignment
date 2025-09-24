"use client";

import { useEffect, useState } from "react";
import { fetchCountries, fetchCompanies, fetchPosts } from "./lib/api";
import { Country, Company, Post } from "./types";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { LoadingSpinner } from "./dashboard/LoadingSpinner";
import { StatsGrid } from "./dashboard/StatsGrid";
import { TopEmittingCountries } from "./dashboard/TopEmittingCountries";
import { RegionStats } from "./dashboard/RegionStats";
import { RecentReports } from "./dashboard/RecentReports";
import { ActionButtons } from "./dashboard/ActionButtons";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesData, companiesData, postsData] = await Promise.all([
          fetchCountries(),
          fetchCompanies(),
          fetchPosts()
        ]);

        setCountries(countriesData);
        setCompanies(companiesData);
        setPosts(postsData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <DashboardHeader
        title="HanaLoop 배출량 대시보드"
        description="전 세계 국가별 및 기업별 CO₂ 배출량 모니터링"
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <StatsGrid countries={countries} companies={companies} posts={posts} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopEmittingCountries countries={countries} />
          <RegionStats countries={countries} />
        </div>

        <RecentReports posts={posts} companies={companies} />

        <ActionButtons />
      </div>
    </div>
  );
}
