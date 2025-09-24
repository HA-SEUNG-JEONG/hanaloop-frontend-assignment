/**
 * 전역 로딩 스피너 컴포넌트
 *
 * 디자인 의사결정:
 * - 일관된 로딩 UI 패턴
 * - 유연한 메시지 커스터마이징
 * - 접근성 고려
 */

import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export function LoadingSpinner({
  message = "데이터를 불러오는 중...",
  className
}: LoadingSpinnerProps) {
  return (
    <div
      className={`min-h-screen bg-background flex items-center justify-center ${
        className || ""
      }`}
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Spinner variant="circle" size={32} className="text-primary" />
        </div>
        <p className="text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
}
