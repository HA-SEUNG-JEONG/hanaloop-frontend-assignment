import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { Notification } from "@/app/types";
import { cn } from "@/lib/utils";
import { getButtonHoverClass } from "@/lib/helpers/notificationUtils";

// 상수 정의
const HOVER_SCALE = 1.05;
const ACTIVE_SCALE = 0.95;

interface NotificationActionsProps {
  notification: Notification;
  onMarkAsRead: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const NotificationActions = ({
  notification,
  onMarkAsRead,
  onDelete,
  isDeleting
}: NotificationActionsProps) => (
  <div className="flex items-center justify-end sm:justify-start space-x-2">
    {!notification.isRead && (
      <Button
        variant="outline"
        size="sm"
        onClick={onMarkAsRead}
        className={cn(
          "text-xs min-w-0 flex-1 sm:flex-none",
          getButtonHoverClass("read")
        )}
        aria-label={`${notification.title} 읽음 처리`}
      >
        <Check className="mr-1 h-3 w-3 sm:mr-1" aria-hidden="true" />
        <span className="hidden sm:inline">읽음</span>
      </Button>
    )}
    <Button
      variant="outline"
      size="sm"
      onClick={onDelete}
      className={cn(
        "min-w-0 flex-1 sm:flex-none",
        getButtonHoverClass("delete"),
        isDeleting && "opacity-50"
      )}
      aria-label={`${notification.title} 삭제`}
      disabled={isDeleting}
    >
      <Trash2 className="mr-1 h-3 w-3 sm:mr-1" aria-hidden="true" />
      <span className="hidden sm:inline">삭제</span>
    </Button>
  </div>
);
