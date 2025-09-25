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
import { Subsidiary } from "../../types";
import { sortSubsidiariesByOwnership } from "@/lib/helpers/companyUtils";

interface SubsidiariesTableProps {
  subsidiaries: Subsidiary[];
  companyName: string;
  onViewDetails?: (subsidiaryId: string) => void;
  onEdit?: (subsidiaryId: string) => void;
}

export function SubsidiariesTable({
  subsidiaries,
  companyName,
  onViewDetails,
  onEdit
}: SubsidiariesTableProps) {
  const sortedSubsidiaries = sortSubsidiariesByOwnership(subsidiaries);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{companyName} 계열사 현황</CardTitle>
        <CardDescription>
          계열사별 지분율, 사업 유형 및 배출량 정보
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">계열사명</TableHead>
                <TableHead className="min-w-[80px]">국가</TableHead>
                <TableHead className="min-w-[100px]">사업 유형</TableHead>
                <TableHead className="min-w-[80px]">지분율</TableHead>
                <TableHead className="min-w-[80px]">설립년도</TableHead>
                <TableHead className="min-w-[80px]">직원 수</TableHead>
                <TableHead className="min-w-[100px]">최신 배출량</TableHead>
                <TableHead className="min-w-[100px]">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSubsidiaries.map((subsidiary) => {
                const latestEmission =
                  subsidiary.emissions[subsidiary.emissions.length - 1];
                return (
                  <TableRow key={subsidiary.id}>
                    <TableCell className="font-medium text-sm sm:text-base">
                      {subsidiary.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {subsidiary.country}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {subsidiary.businessType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      <Badge
                        variant={
                          subsidiary.ownershipPercentage >= 50
                            ? "default"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {subsidiary.ownershipPercentage}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      {subsidiary.establishedYear}
                    </TableCell>
                    <TableCell className="text-sm sm:text-base">
                      {subsidiary.employeeCount.toLocaleString()}명
                    </TableCell>
                    <TableCell className="font-medium text-sm sm:text-base">
                      {latestEmission?.emissions.toFixed(0) || 0} 톤
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => onViewDetails?.(subsidiary.id)}
                        >
                          상세보기
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => onEdit?.(subsidiary.id)}
                        >
                          편집
                        </Button>
                      </div>
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
