import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { CompanyEmissionsData } from "../../types";

interface CompaniesTableProps {
  companyEmissionsData: CompanyEmissionsData[];
}

export function CompaniesTable({ companyEmissionsData }: CompaniesTableProps) {
  const sortedCompanies = companyEmissionsData.sort(
    (a, b) => b.latestEmissions - a.latestEmissions
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>기업별 배출량 상세</CardTitle>
        <CardDescription>각 기업의 배출량 데이터 및 변화율</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">기업명</TableHead>
                <TableHead className="min-w-[80px]">국가</TableHead>
                <TableHead className="min-w-[100px]">최신 배출량</TableHead>
                <TableHead className="min-w-[80px]">변화율</TableHead>
                <TableHead className="min-w-[80px]">데이터 포인트</TableHead>
                <TableHead className="min-w-[120px]">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium text-sm sm:text-base">
                    {company.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {company.country}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-sm sm:text-base">
                    {company.latestEmissions.toFixed(0)} 톤
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {company.change > 0 ? (
                        <Badge variant="destructive" className="text-xs">
                          +{company.change.toFixed(1)}%
                        </Badge>
                      ) : company.change < 0 ? (
                        <Badge variant="default" className="text-xs">
                          {company.change.toFixed(1)}%
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          0%
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm sm:text-base">
                    {company.emissions.length}개
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        상세보기
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        편집
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
