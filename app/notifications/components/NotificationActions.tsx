import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { Notification } from "@/app/types";
import { cn } from "@/lib/utils";

// 상수 정의
const HOVER_SCALE = 1.05;
const ACTIVE_SCALE = 0.95;

// 유틸리티 함수
const getButtonHoverClass = (variant: "read" | "delete") => {
  const baseClass =
    "transition-all duration-300 hover:scale-105 active:scale-95";

  switch (variant) {
    case "read":
      return cn(
        baseClass,
        "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
      );
    case "delete":
      return cn(baseClass, "text-red-600 hover:text-red-700 hover:bg-red-50");
    default:
      return baseClass;
  }
};

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
  <div className="flex items-center space-x-2 ml-4">
    {!notification.isRead && (
      <Button
        variant="outline"
        size="sm"
        onClick={onMarkAsRead}
        className={cn("text-xs", getButtonHoverClass("read"))}
        aria-label={`${notification.title} 읽음 처리`}
      >
        <Check className="mr-1 h-3 w-3" aria-hidden="true" />
        읽음
      </Button>
    )}
    <Button
      variant="outline"
      size="sm"
      onClick={onDelete}
      className={cn(getButtonHoverClass("delete"), isDeleting && "opacity-50")}
      aria-label={`${notification.title} 삭제`}
      disabled={isDeleting}
    >
      <Trash2 className="mr-1 h-3 w-3" aria-hidden="true" />
      삭제
    </Button>
  </div>
);
