import { Country } from "@/app/types";

// 지역별 통계 타입 정의
export interface RegionStat {
  region: string;
  count: number;
  emissions: number;
  avgEmissionsPerCountry: number;
}

// 지역별 통계 계산 함수
export const calculateRegionStats = (countries: Country[]): RegionStat[] => {
  const regionMap = new Map<string, { count: number; emissions: number }>();

  // 단일 순회로 모든 데이터 처리
  countries.forEach((country) => {
    const existing = regionMap.get(country.region);
    if (existing) {
      existing.count++;
      existing.emissions += country.emissions;
    } else {
      regionMap.set(country.region, {
        count: 1,
        emissions: country.emissions
      });
    }
  });

  // Map을 배열로 변환하고 정렬
  return Array.from(regionMap.entries())
    .map(([region, { count, emissions }]) => ({
      region,
      count: count,
      emissions: emissions,
      avgEmissionsPerCountry: emissions / count
    }))
    .sort((a, b) => b.emissions - a.emissions); // 배출량 기준 내림차순 정렬
};

// 차트 데이터 생성 함수들
export const createBarChartData = (countries: Country[]) => {
  const sortedCountries = countries.sort((a, b) => b.emissions - a.emissions);
  const top10Countries = sortedCountries.slice(0, 10);
  const top10CountriesData = top10Countries.map(
    ({ name, emissions, population, gdp }) => ({
      name,
      emissions,
      population: population / 1000000, // 백만 단위로 변환
      gdp
    })
  );

  return top10CountriesData;
};

export const createPieChartData = (countries: Country[]) => {
  const regionMap = new Map<string, number>();

  countries.forEach((country) => {
    const current = regionMap.get(country.region) || 0;
    regionMap.set(country.region, current + country.emissions);
  });

  return Array.from(regionMap.entries()).map(([name, value]) => ({
    name,
    value
  }));
};
