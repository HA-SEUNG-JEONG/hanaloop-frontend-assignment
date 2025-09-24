import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

/**
 * 알림 페이지 헤더 컴포넌트
 * 
 * 가정:
 * - 읽지 않은 알림이 있을 때만 "모두 읽음" 버튼 표시
 * - 읽지 않은 알림 수는 실시간으로 업데이트됨
 * 
 * 아키텍처:
 * - Props를 통한 데이터 전달
 * - 콜백 함수를 통한 액션 처리
 */
interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export function NotificationHeader({ unreadCount, onMarkAllAsRead }: NotificationHeaderProps) {
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">알림</h1>
            <p className="text-xl text-muted-foreground">
              시스템 알림 및 중요 메시지를 확인하세요
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {unreadCount}개 읽지 않음
              </Badge>
            )}
            {unreadCount > 0 && (
              <Button onClick={onMarkAllAsRead} variant="outline" size="sm">
                <CheckCheck className="mr-2 h-4 w-4" />
                모두 읽음
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
