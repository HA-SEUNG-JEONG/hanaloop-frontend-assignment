import { StatsCards, StatCardData } from "@/components/common/StatsCards";
import { Globe, TrendingUp, Building2, FileText } from "lucide-react";
import { Country, Company, Post } from "../../types";

interface StatsGridProps {
  countries: Country[];
  companies: Company[];
  posts: Post[];
  isLoading?: boolean;
}

export function StatsGrid({
  countries,
  companies,
  posts,
  isLoading = false
}: StatsGridProps) {
  const totalEmissions = countries.reduce(
    (sum, country) => sum + country.emissions,
    0
  );
  const totalPopulation = countries.reduce(
    (sum, country) => sum + country.population,
    0
  );
  const avgEmissionsPerCapita =
    totalPopulation > 0 ? (totalEmissions * 1000000) / totalPopulation : 0;
  const totalCompanies = companies.length;
  const totalPosts = posts.length;

  const statsData: StatCardData[] = [
    {
      title: "총 배출량",
      value: `${totalEmissions.toFixed(0)}M`,
      description: "백만 톤 CO₂",
      icon: Globe,
      trend: {
        value: 2.3,
        label: "전년 대비 증가",
        isPositive: false
      },
      isLoading
    },
    {
      title: "1인당 배출량",
      value: avgEmissionsPerCapita.toFixed(1),
      description: "톤 CO₂/인",
      icon: TrendingUp,
      trend: {
        value: 1.8,
        label: "전년 대비 감소",
        isPositive: true
      },
      isLoading
    },
    {
      title: "등록 기업",
      value: totalCompanies,
      description: "개 기업",
      icon: Building2,
      trend: {
        value: 12.5,
        label: "신규 등록",
        isPositive: true
      },
      isLoading
    },
    {
      title: "보고서",
      value: totalPosts,
      description: "개 보고서",
      icon: FileText,
      trend: {
        value: 8.2,
        label: "이번 달 작성",
        isPositive: true
      },
      isLoading
    }
  ];

  return <StatsCards stats={statsData} />;
}
