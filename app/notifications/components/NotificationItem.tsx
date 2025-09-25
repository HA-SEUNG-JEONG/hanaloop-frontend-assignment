import { memo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Notification } from "@/app/types";
import { getNotificationCardClass } from "@/lib/helpers/notificationUtils";
import { cn } from "@/lib/utils";
import { NotificationIcon } from "./NotificationIcon";
import { NotificationContent } from "./NotificationContent";
import { NotificationActions } from "./NotificationActions";

// 상수 정의
const DELETE_ANIMATION_DURATION = 300;

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

/**
 * 개별 알림 아이템 컴포넌트
 *
 * 가정:
 * - 알림 클릭 시 읽음 처리
 * - 삭제 버튼은 항상 표시
 * - 읽지 않은 알림은 시각적으로 구분
 *
 * 아키텍처:
 * - memo로 최적화하여 불필요한 리렌더링 방지
 * - Props를 통한 데이터와 액션 전달
 * - 하위 컴포넌트들로 분리된 구조
 */
export const NotificationItem = memo(function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete
}: NotificationItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleMarkAsRead = () => {
    onMarkAsRead(notification.id);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(notification.id);
    }, DELETE_ANIMATION_DURATION);
  };

  return (
    <Card
      className={cn(
        getNotificationCardClass(notification.isRead),
        "hover-lift transition-all duration-300 group",
        "animate-slide-in-up",
        isDeleting && "animate-fade-out scale-95"
      )}
      role="article"
      aria-labelledby={`notification-title-${notification.id}`}
      aria-describedby={`notification-message-${notification.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="mt-1">
              <div
                className={cn(
                  "transition-all duration-300 group-hover:scale-110",
                  !notification.isRead && "animate-pulse-glow"
                )}
              >
                <NotificationIcon type={notification.type} />
              </div>
            </div>

            <NotificationContent notification={notification} />
          </div>

          <NotificationActions
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </div>
      </CardContent>
    </Card>
  );
});
