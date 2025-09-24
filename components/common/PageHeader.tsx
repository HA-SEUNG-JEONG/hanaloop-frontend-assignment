/**
 * 공통 페이지 헤더 컴포넌트
 *
 * 디자인 의사결정:
 * - 명확한 네비게이션과 제목
 * - 일관된 헤더 스타일
 * - 재사용 가능한 범용 컴포넌트
 */

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  showActionButton?: boolean;
  actionButtonText?: string;
  onActionClick?: () => void;
}

export function PageHeader({
  title,
  description,
  showBackButton = true,
  showActionButton = false,
  actionButtonText = "새 보고서 작성",
  onActionClick
}: PageHeaderProps) {
  return (
    <div className="border-b bg-card">
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
              <Plus className="h-4 w-4 mr-2" />
              {actionButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
