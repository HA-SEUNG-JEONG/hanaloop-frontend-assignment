import { Country } from "@/app/types";

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
