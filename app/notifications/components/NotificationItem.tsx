import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Check,
  AlertTriangle,
  Info,
  XCircle,
  CheckCircle
} from "lucide-react";
import { Notification } from "../../types";
import {
  getNotificationIconClass,
  getPriorityColorClass,
  getCategoryName,
  getPriorityName,
  formatRelativeDate,
  getNotificationCardClass,
  getTitleClass
} from "../utils/notificationUtils";

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
 */
interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  const iconClass = getNotificationIconClass(type);

  switch (type) {
    case "info":
      return <Info className={iconClass} />;
    case "warning":
      return <AlertTriangle className={iconClass} />;
    case "error":
      return <XCircle className={iconClass} />;
    case "success":
      return <CheckCircle className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

export const NotificationItem = memo(function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete
}: NotificationItemProps) {
  return (
    <Card className={getNotificationCardClass(notification.isRead)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="mt-1">
              <NotificationIcon type={notification.type} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className={getTitleClass(notification.isRead)}>
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-3">
                {notification.message}
              </p>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{formatRelativeDate(notification.createdAt)}</span>
                <Badge
                  variant="outline"
                  className={getPriorityColorClass(notification.priority)}
                >
                  {getPriorityName(notification.priority)}
                </Badge>
                <Badge variant="secondary">
                  {getCategoryName(notification.category)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {!notification.isRead && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                className="text-xs"
              >
                <Check className="mr-1 h-3 w-3" />
                읽음
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(notification.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              삭제
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
