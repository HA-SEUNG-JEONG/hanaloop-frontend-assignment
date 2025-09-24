/**
 * 국가 데이터 테이블 컴포넌트
 *
 * 디자인 의사결정:
 * - 정렬된 테이블로 데이터 가독성 향상
 * - 배지와 아이콘을 통한 시각적 구분
 * - 반응형 테이블 레이아웃
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Country } from "../../types";

interface CountriesTableProps {
  countries: Country[];
}

export function CountriesTable({ countries }: CountriesTableProps) {
  const sortedCountries = countries.sort((a, b) => b.emissions - a.emissions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>전체 국가 데이터</CardTitle>
        <CardDescription>모든 국가의 상세 배출량 정보</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">국가</TableHead>
                <TableHead className="min-w-[80px]">지역</TableHead>
                <TableHead className="min-w-[80px]">인구</TableHead>
                <TableHead className="min-w-[80px]">GDP</TableHead>
                <TableHead className="min-w-[100px]">배출량</TableHead>
                <TableHead className="min-w-[100px]">1인당 배출량</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCountries.map((country) => {
                const emissionsPerCapita =
                  (country.emissions * 1000000) / country.population;

                return (
                  <TableRow key={country.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                        <span className="text-sm sm:text-base">
                          {country.name}
                        </span>
                        <Badge variant="outline" className="text-xs w-fit">
                          {country.code}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        {country.region}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      {(country.population / 1000000).toFixed(1)}M
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      ${country.gdp.toFixed(0)}B
                    </TableCell>
                    <TableCell className="font-medium text-sm sm:text-base">
                      {country.emissions.toFixed(0)}M 톤
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      {emissionsPerCapita.toFixed(1)} 톤
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
