import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { NotificationFilter, NotificationCategory } from "@/app/types";

/**
 * 알림 필터 및 검색 컴포넌트
 *
 * 가정:
 * - 필터 변경 시 즉시 반영됨
 * - 검색은 제목과 내용 모두에서 수행됨
 * - 카테고리 필터는 드롭다운으로 제공
 *
 * 아키텍처:
 * - 상태는 부모 컴포넌트에서 관리
 * - 콜백을 통해 상태 변경 전달
 */
interface NotificationFiltersProps {
  filter: NotificationFilter;
  categoryFilter: NotificationCategory | "all";
  searchTerm: string;
  onFilterChange: (filter: NotificationFilter) => void;
  onCategoryFilterChange: (category: NotificationCategory | "all") => void;
  onSearchTermChange: (term: string) => void;
}

export function NotificationFilters({
  filter,
  categoryFilter,
  searchTerm,
  onFilterChange,
  onCategoryFilterChange,
  onSearchTermChange
}: NotificationFiltersProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          필터 및 검색
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 검색 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="알림 제목이나 내용으로 검색..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* 읽음 상태 필터 */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("all")}
            >
              전체
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("unread")}
            >
              읽지 않음
            </Button>
            <Button
              variant={filter === "read" ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange("read")}
            >
              읽음
            </Button>
          </div>

          {/* 카테고리 필터 */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              onCategoryFilterChange(
                e.target.value as NotificationCategory | "all"
              )
            }
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">모든 카테고리</option>
            <option value="emission">배출량</option>
            <option value="report">보고서</option>
            <option value="system">시스템</option>
            <option value="company">기업</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
