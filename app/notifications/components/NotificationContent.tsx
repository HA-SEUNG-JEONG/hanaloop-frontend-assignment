import { Badge } from "@/components/ui/badge";
import { Notification } from "@/app/types";
import {
  formatRelativeDate,
  getCategoryName,
  getPriorityColorClass,
  getPriorityName,
  getTitleClass
} from "@/lib/helpers/notificationUtils";
import { cn } from "@/lib/utils";

interface NotificationContentProps {
  notification: Notification;
}

export const NotificationContent = ({
  notification
}: NotificationContentProps) => (
  <div className="flex-1 min-w-0">
    <div className="flex items-start sm:items-center space-x-2 mb-2">
      <h3
        className={cn(
          getTitleClass(notification.isRead),
          "transition-all duration-300 group-hover:text-primary text-sm sm:text-base leading-tight"
        )}
      >
        {notification.title}
      </h3>
      {!notification.isRead && (
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-glow flex-shrink-0 mt-1 sm:mt-0"
          aria-label="읽지 않은 알림"
        />
      )}
    </div>

    <p className="text-gray-600 dark:text-gray-400 mb-3 transition-all duration-300 text-sm sm:text-base leading-relaxed">
      {notification.message}
    </p>

    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
      <time
        className="transition-all duration-300"
        dateTime={notification.createdAt}
      >
        {formatRelativeDate(notification.createdAt)}
      </time>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className={cn(
            getPriorityColorClass(notification.priority),
            "transition-all duration-300 group-hover:scale-105 text-xs"
          )}
          aria-label={`우선순위: ${getPriorityName(notification.priority)}`}
        >
          {getPriorityName(notification.priority)}
        </Badge>
        <Badge
          variant="secondary"
          className={cn(
            "transition-all duration-300 group-hover:scale-105 text-xs"
          )}
          aria-label={`카테고리: ${getCategoryName(notification.category)}`}
        >
          {getCategoryName(notification.category)}
        </Badge>
      </div>
    </div>
  </div>
);
