/**
 * 사용자 페이지 헤더 컴포넌트
 *
 * 가정:
 * - 사용자는 대시보드로 돌아갈 수 있어야 함
 * - 새 사용자 추가 기능이 필요함
 *
 * 디자인 의사결정:
 * - 일관된 페이지 헤더 패턴
 * - 명확한 네비게이션과 액션 버튼
 */

import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UsersPageHeaderProps {
  onAddUser?: () => void;
}

export function UsersPageHeader({ onAddUser }: UsersPageHeaderProps) {
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
            <h1 className="text-3xl font-bold tracking-tight">사용자 관리</h1>
            <p className="text-muted-foreground">
              시스템 사용자 계정 및 권한 관리
            </p>
          </div>
          <Button onClick={onAddUser}>
            <UserPlus className="h-4 w-4 mr-2" />새 사용자 추가
          </Button>
        </div>
      </div>
    </div>
  );
}
