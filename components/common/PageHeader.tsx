/**
 * 통합된 페이지 헤더 컴포넌트
 *
 * 디자인 의사결정:
 * - 명확한 네비게이션과 제목
 * - 일관된 헤더 스타일
 * - 재사용 가능한 범용 컴포넌트
 * - 다양한 헤더 스타일 지원 (기본, 대시보드, 중앙정렬)
 *
 * 아키텍처:
 * - 단일 컴포넌트로 모든 페이지 헤더 요구사항 충족
 * - variant prop으로 스타일 변경
 * - 커스터마이징 가능한 액션 버튼
 */

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, UserPlus, FileText, BarChart3 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  variant?: "default" | "dashboard" | "centered";
  showBackButton?: boolean;
  showActionButton?: boolean;
  actionButtonText?: string;
  actionButtonIcon?: ReactNode;
  onActionClick?: () => void;
  lastUpdated?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  variant = "default",
  showBackButton = true,
  showActionButton = false,
  actionButtonText = "새 항목 추가",
  actionButtonIcon,
  onActionClick,
  lastUpdated,
  className
}: PageHeaderProps) {
  // 기본 액션 버튼 아이콘 결정
  const defaultIcon = actionButtonIcon || <Plus className="h-4 w-4" />;

  if (variant === "dashboard") {
    return (
      <header
        className={cn(
          "border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10",
          "container mx-auto px-4 py-6 sm:py-8 text-center space-y-4",
          className
        )}
        role="banner"
      >
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>마지막 업데이트: {lastUpdated}</span>
          </div>
        )}
      </header>
    );
  }

  if (variant === "centered") {
    return (
      <div className={cn("border-b bg-card", className)}>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            {showBackButton && (
              <div className="flex justify-center">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    대시보드로 돌아가기
                  </Button>
                </Link>
              </div>
            )}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            </div>
            {showActionButton && (
              <div className="flex justify-center">
                <Button onClick={onActionClick}>
                  {defaultIcon}
                  <span className="ml-2">{actionButtonText}</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 기본 variant (default)
  return (
    <div className={cn("border-b bg-card", className)}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            {showBackButton && (
              <div className="flex items-center space-x-4 mb-2">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    대시보드로 돌아가기
                  </Button>
                </Link>
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {showActionButton && (
            <Button onClick={onActionClick}>
              {defaultIcon}
              <span className="ml-2">{actionButtonText}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// 편의를 위한 특화된 헤더 컴포넌트들
export function UsersPageHeader({ onAddUser }: { onAddUser?: () => void }) {
  return (
    <PageHeader
      title="사용자 관리"
      description="시스템 사용자 계정 및 권한 관리"
      showBackButton={true}
      showActionButton={!!onAddUser}
      actionButtonText="새 사용자 추가"
      actionButtonIcon={<UserPlus className="h-4 w-4" />}
      onActionClick={onAddUser}
    />
  );
}

export function ReportsPageHeader({
  onNewReport
}: {
  onNewReport?: () => void;
}) {
  return (
    <PageHeader
      title="기업 배출량 보고서"
      description="기업별 CO₂ 배출량 모니터링 및 보고서 관리"
      showBackButton={true}
      showActionButton={!!onNewReport}
      actionButtonText="새 보고서 작성"
      actionButtonIcon={<FileText className="h-4 w-4" />}
      onActionClick={onNewReport}
    />
  );
}

export function AnalyticsPageHeader() {
  return (
    <PageHeader
      title="국가별 배출량 분석"
      description="전 세계 국가별 CO₂ 배출량 상세 분석"
      showBackButton={true}
      showActionButton={false}
    />
  );
}

export function DashboardPageHeader({ lastUpdated }: { lastUpdated?: string }) {
  return (
    <PageHeader
      title="HanaLoop 배출량 대시보드"
      description="전 세계 국가별 및 기업별 CO₂ 배출량 모니터링"
      variant="dashboard"
      showBackButton={false}
      showActionButton={false}
      lastUpdated={lastUpdated}
    />
  );
}
