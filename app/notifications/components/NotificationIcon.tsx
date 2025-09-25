import { Bell, AlertTriangle, Info, XCircle, CheckCircle } from "lucide-react";
import { Notification } from "@/app/types";
import { getNotificationIconClass } from "@/lib/helpers/notificationUtils";

interface NotificationIconProps {
  type: Notification["type"];
}

export const NotificationIcon = ({ type }: NotificationIconProps) => {
  const iconClass = getNotificationIconClass(type);

  switch (type) {
    case "info":
      return <Info className={iconClass} aria-hidden="true" />;
    case "warning":
      return <AlertTriangle className={iconClass} aria-hidden="true" />;
    case "error":
      return <XCircle className={iconClass} aria-hidden="true" />;
    case "success":
      return <CheckCircle className={iconClass} aria-hidden="true" />;
    default:
      return <Bell className={iconClass} aria-hidden="true" />;
  }
};
