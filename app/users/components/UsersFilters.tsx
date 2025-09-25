/**
 * 사용자 필터 컴포넌트
 *
 * 가정:
 * - 사용자는 이름, 이메일로 검색할 수 있어야 함
 * - 역할, 상태, 국가별로 필터링할 수 있어야 함
 * - 필터 상태는 URL이나 상태로 관리되어야 함
 *
 * 디자인 의사결정:
 * - 일관된 필터 UI 패턴
 * - 직관적인 검색 및 필터 옵션
 * - 반응형 레이아웃
 */

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserFilter, UserRole, UserStatus } from "@/app/types";

interface UsersFiltersProps {
  filter: UserFilter;
  onFilterChange: (filter: UserFilter) => void;
  availableCountries: string[];
}

export function UsersFilters({
  filter,
  onFilterChange,
  availableCountries
}: UsersFiltersProps) {
  const handleSearchChange = (search: string) => {
    onFilterChange({ ...filter, search });
  };

  const handleRoleChange = (role: UserRole | "all") => {
    onFilterChange({ ...filter, role });
  };

  const handleStatusChange = (status: UserStatus | "all") => {
    onFilterChange({ ...filter, status });
  };

  const handleCountryChange = (country: string | "all") => {
    onFilterChange({ ...filter, country });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      role: "all",
      status: "all",
      country: "all"
    });
  };

  const hasActiveFilters =
    filter.search ||
    filter.role !== "all" ||
    filter.status !== "all" ||
    filter.country !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* 검색 */}
      <div className="relative flex-1 min-w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="사용자 검색..."
          value={filter.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-8 pr-4 py-2 border rounded-md text-sm w-full"
        />
      </div>

      {/* 필터 옵션들 */}
      <div className="flex flex-wrap gap-2">
        {/* 역할 필터 */}
        <select
          value={filter.role}
          onChange={(e) => handleRoleChange(e.target.value as UserRole | "all")}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="all">모든 역할</option>
          <option value="관리자">관리자</option>
          <option value="감사자">감사자</option>
          <option value="사용자">사용자</option>
        </select>

        {/* 상태 필터 */}
        <select
          value={filter.status}
          onChange={(e) =>
            handleStatusChange(e.target.value as UserStatus | "all")
          }
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="all">모든 상태</option>
          <option value="활성">활성</option>
          <option value="비활성">비활성</option>
        </select>

        {/* 국가 필터 */}
        <select
          value={filter.country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="all">모든 국가</option>
          {availableCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* 필터 초기화 */}
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            필터 초기화
          </Button>
        )}
      </div>
    </div>
  );
}
