import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Country } from "@/app/types";
import { calculateRegionStats } from "@/lib/helpers/analyticsUtils";

interface RegionStatsProps {
  countries: Country[];
}

export function RegionStats({ countries }: RegionStatsProps) {
  // 헬퍼 함수를 사용하여 지역별 통계 계산
  const regionStats = calculateRegionStats(countries);

  // 총 통계 계산
  const totalCountries = countries.length;
  const totalEmissions = countries.reduce(
    (sum, country) => sum + country.emissions,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>지역별 통계</CardTitle>
        <CardDescription>
          {totalCountries}개국, 총 {totalEmissions.toFixed(0)}M톤 CO₂
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {regionStats.map((stat) => (
            <div
              key={stat.region}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="font-medium">{stat.region}</p>
                <p className="text-sm text-muted-foreground">
                  {stat.count}개국 • 평균{" "}
                  {stat.avgEmissionsPerCountry.toFixed(1)}M톤/국가
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{stat.emissions.toFixed(0)}M</p>
                <p className="text-xs text-muted-foreground">톤 CO₂</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
