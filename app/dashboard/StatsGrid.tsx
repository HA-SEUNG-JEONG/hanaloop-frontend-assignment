import { StatsCard } from "./StatsCard";
import { Globe, TrendingUp, Building2, FileText } from "lucide-react";
import { Country, Company, Post } from "../types";

interface StatsGridProps {
  countries: Country[];
  companies: Company[];
  posts: Post[];
}

export function StatsGrid({ countries, companies, posts }: StatsGridProps) {
  // 통계 계산
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="총 배출량"
        value={`${totalEmissions.toFixed(0)}M`}
        description="백만 톤 CO₂"
        icon={Globe}
      />
      <StatsCard
        title="1인당 배출량"
        value={avgEmissionsPerCapita.toFixed(1)}
        description="톤 CO₂/인"
        icon={TrendingUp}
      />
      <StatsCard
        title="등록 기업"
        value={totalCompanies}
        description="개 기업"
        icon={Building2}
      />
      <StatsCard
        title="보고서"
        value={totalPosts}
        description="개 보고서"
        icon={FileText}
      />
    </div>
  );
}
