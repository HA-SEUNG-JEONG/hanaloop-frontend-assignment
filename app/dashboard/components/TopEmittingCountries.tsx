import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Country } from "../../types";

interface TopEmittingCountriesProps {
  countries: Country[];
}

export function TopEmittingCountries({ countries }: TopEmittingCountriesProps) {
  const topEmittingCountries = [...countries]
    .sort((a, b) => b.emissions - a.emissions)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>상위 배출 국가</CardTitle>
        <CardDescription>CO₂ 배출량 기준 상위 5개국</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topEmittingCountries.map((country, index) => (
            <div key={country.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Badge
                  variant="outline"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                >
                  {index + 1}
                </Badge>
                <div>
                  <p className="font-medium">{country.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {country.region}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{country.emissions.toFixed(0)}M</p>
                <p className="text-xs text-muted-foreground">톤 CO₂</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
