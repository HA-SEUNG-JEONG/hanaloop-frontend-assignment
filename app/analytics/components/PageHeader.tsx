/**
 * 페이지 헤더 컴포넌트
 *
 * 디자인 의사결정:
 * - 명확한 네비게이션과 제목
 * - 일관된 헤더 스타일
 */

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PageHeader() {
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  대시보드로 돌아가기
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              국가별 배출량 분석
            </h1>
            <p className="text-muted-foreground">
              전 세계 국가별 CO₂ 배출량 상세 분석
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
