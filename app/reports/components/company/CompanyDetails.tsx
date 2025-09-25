import { Company } from "@/app/types";
import { InfoCard, InfoItem, StatItem } from "../InfoCard";
import { EmissionsBadge } from "../EmissionsBadge";
import {
  calculateEmissionChange,
  calculateTotalEmployees,
  calculateTotalSubsidiaryEmissions,
  calculateTotalCompanyEmissions,
  calculateAverageOwnership
} from "@/lib/helpers/companyUtils";

interface CompanyDetailsProps {
  company: Company;
}

export function CompanyDetails({ company }: CompanyDetailsProps) {
  const latestEmission = company.emissions[company.emissions.length - 1];
  const change = calculateEmissionChange(company.emissions);
  const totalEmployees = calculateTotalEmployees(company);
  const totalSubsidiaryEmissions = calculateTotalSubsidiaryEmissions(company);
  const totalCompanyEmissions = calculateTotalCompanyEmissions(company);
  const averageOwnership = calculateAverageOwnership(company);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 기본 정보 */}
      <InfoCard
        title={company.name}
        description="기업 기본 정보"
        titleBadge={company.country}
      >
        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            label="산업분야"
            badge={company.industry}
            badgeVariant="secondary"
          />
          <InfoItem label="사업 유형" value={company.businessType} />
          <InfoItem label="설립년도" value={`${company.establishedYear}년`} />
          <InfoItem
            label="연매출"
            value={`${company.revenue.toLocaleString()}억원`}
          />
        </div>
      </InfoCard>

      {/* 인력 및 계열사 정보 */}
      <InfoCard title="조직 현황" description="인력 및 계열사 정보">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              본사 직원 수
            </p>
            <p className="text-lg font-semibold mt-1">
              {company.employeeCount.toLocaleString()}명
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              총 직원 수
            </p>
            <p className="text-lg font-semibold mt-1">
              {totalEmployees.toLocaleString()}명
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              계열사 수
            </p>
            <p className="text-lg font-semibold mt-1">
              {company.subsidiaries.length}개
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              평균 지분율
            </p>
            <p className="text-lg font-semibold mt-1">
              {averageOwnership.toFixed(1)}%
            </p>
          </div>
        </div>
      </InfoCard>

      {/* 배출량 정보 */}
      <InfoCard
        title="배출량 현황"
        description="본사 및 계열사 총 배출량 정보"
        className="lg:col-span-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              본사 배출량
            </p>
            <p className="text-2xl font-bold mt-2">
              {latestEmission?.emissions.toFixed(0) || 0} 톤
            </p>
            <div className="mt-2">
              <EmissionsBadge change={change} />
            </div>
          </div>
          <StatItem
            label="계열사 총 배출량"
            value={`${totalSubsidiaryEmissions.toFixed(0)} 톤`}
          />
          <StatItem
            label="전체 총 배출량"
            value={`${totalCompanyEmissions.toFixed(0)} 톤`}
            className="text-primary"
          />
        </div>
      </InfoCard>
    </div>
  );
}
