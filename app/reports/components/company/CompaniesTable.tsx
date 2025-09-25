"use client";

import { useState } from "react";
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
import { CompanyEmissionsData, Company } from "@/app/types";
import { sortCompaniesByEmissions } from "@/lib/helpers/companyUtils";
import { EmissionsBadge } from "../EmissionsBadge";
import { CompanyEmissionsModal } from "./CompanyEmissionsModal";
import { CompanyDetailsModal } from "./CompanyDetailsModal";
import { CompanyCreateModal } from "./CompanyCreateModal";
import { Eye, Edit, Plus } from "lucide-react";

interface CompaniesTableProps {
  companyEmissionsData: CompanyEmissionsData[];
  companies: Company[];
  onViewDetails?: (companyId: string) => void;
  onEdit?: (companyId: string) => void;
  onRefresh?: () => void;
}

export function CompaniesTable({
  companyEmissionsData,
  companies,
  onViewDetails,
  onEdit,
  onRefresh
}: CompaniesTableProps) {
  const [isEmissionsModalOpen, setIsEmissionsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const sortedCompanies = sortCompaniesByEmissions(companyEmissionsData);

  const handleViewDetails = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      setIsDetailsModalOpen(true);
    }
  };

  const handleEditEmissions = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setSelectedCompany(company);
      setIsEmissionsModalOpen(true);
    }
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleEmissionsModalClose = () => {
    setIsEmissionsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleEmissionsSave = () => {
    onRefresh?.();
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateSuccess = () => {
    onRefresh?.();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>기업별 배출량 상세</CardTitle>
              <CardDescription>
                각 기업의 배출량 데이터 및 변화율
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />새 회사 추가
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px] sm:w-[160px]">
                    기업명
                  </TableHead>
                  <TableHead className="w-[60px] sm:w-[80px]">국가</TableHead>
                  <TableHead className="hidden md:table-cell w-[100px]">
                    산업분야
                  </TableHead>
                  <TableHead className="hidden lg:table-cell w-[80px]">
                    계열사 수
                  </TableHead>
                  <TableHead className="w-[100px] sm:w-[120px]">
                    최신 배출량
                  </TableHead>
                  <TableHead className="w-[80px] sm:w-[100px]">
                    변화율
                  </TableHead>
                  <TableHead className="w-[100px] sm:w-[120px]">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium text-sm sm:text-base">
                      <div className="flex flex-col">
                        <span>{company.name}</span>
                        <div className="md:hidden flex flex-col space-y-1 mt-1">
                          <Badge variant="secondary" className="text-xs w-fit">
                            {company.industry}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {company.businessType}
                          </span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {company.subsidiaryCount}개 계열사
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {company.country}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col space-y-1">
                        <Badge variant="secondary" className="text-xs w-fit">
                          {company.industry}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {company.businessType}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline" className="text-xs">
                        {company.subsidiaryCount}개
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-sm sm:text-base">
                      {company.latestEmissions.toFixed(0)} 톤
                    </TableCell>
                    <TableCell>
                      <EmissionsBadge change={company.change} />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleViewDetails(company.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          상세보기
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleEditEmissions(company.id)}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          배출량 편집
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

      {/* 기업 상세보기 모달 */}
      <CompanyDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        company={selectedCompany}
        onRefresh={onRefresh}
      />

      {/* 배출량 편집 모달 */}
      <CompanyEmissionsModal
        isOpen={isEmissionsModalOpen}
        onClose={handleEmissionsModalClose}
        onSuccess={handleEmissionsSave}
        company={selectedCompany}
      />

      {/* 새 회사 추가 모달 */}
      <CompanyCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}
