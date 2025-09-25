import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Country } from "@/app/types";
import { useMemo } from "react";
import { TOP_COUNTRIES_LIMIT } from "@/lib/constants/animations";
import { CountryItem } from "./CountryItem";

interface TopEmittingCountriesProps {
  countries: Country[];
}

export function TopEmittingCountries({ countries }: TopEmittingCountriesProps) {
  const { topEmittingCountries, maxEmissions } = useMemo(() => {
    const sorted = [...countries]
      .sort((a, b) => b.emissions - a.emissions)
      .slice(0, TOP_COUNTRIES_LIMIT);

    const max = Math.max(...sorted.map((c) => c.emissions));

    return {
      topEmittingCountries: sorted,
      maxEmissions: max
    };
  }, [countries]);

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="animate-fade-in-scale">상위 배출 국가</CardTitle>
        <CardDescription
          className="animate-slide-in-up"
          style={{ animationDelay: "100ms" }}
        >
          CO₂ 배출량 기준 상위 {TOP_COUNTRIES_LIMIT}개국
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" role="list" aria-label="상위 배출 국가 목록">
          {topEmittingCountries.map((country, index) => (
            <CountryItem
              key={country.id}
              country={country}
              index={index}
              maxEmissions={maxEmissions}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
