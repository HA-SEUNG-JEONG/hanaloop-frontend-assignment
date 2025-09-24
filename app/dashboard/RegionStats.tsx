import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Country } from "../types";

interface RegionStatsProps {
  countries: Country[];
}

export function RegionStats({ countries }: RegionStatsProps) {
  const regionStats = countries.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = { count: 0, emissions: 0 };
    }
    acc[country.region].count++;
    acc[country.region].emissions += country.emissions;
    return acc;
  }, {} as Record<string, { count: number; emissions: number }>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>지역별 통계</CardTitle>
        <CardDescription>지역별 국가 수 및 총 배출량</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(regionStats).map(([region, stats]) => (
            <div key={region} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{region}</p>
                <p className="text-sm text-muted-foreground">
                  {stats.count}개국
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{stats.emissions.toFixed(0)}M</p>
                <p className="text-xs text-muted-foreground">톤 CO₂</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
