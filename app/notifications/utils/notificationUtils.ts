import {
  Notification,
  NotificationType,
  NotificationPriority,
  NotificationCategory
} from "../../types";

/**
 * 알림 관련 유틸리티 함수들
 *
 * 가정:
 * - 아이콘과 색상은 고정된 매핑을 사용
 * - 날짜 포맷팅은 한국어 기준
 * - 카테고리명은 한국어로 표시
 */

// 알림 타입별 아이콘 클래스명
export const getNotificationIconClass = (type: NotificationType): string => {
  switch (type) {
    case "info":
      return "w-5 h-5 text-blue-500";
    case "warning":
      return "w-5 h-5 text-yellow-500";
    case "error":
      return "w-5 h-5 text-red-500";
    case "success":
      return "w-5 h-5 text-green-500";
    default:
      return "w-5 h-5 text-gray-500";
  }
};

// 우선순위별 색상 클래스
export const getPriorityColorClass = (
  priority: NotificationPriority
): string => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

// 카테고리별 한글명
export const getCategoryName = (category: NotificationCategory): string => {
  switch (category) {
    case "emission":
      return "배출량";
    case "report":
      return "보고서";
    case "system":
      return "시스템";
    case "company":
      return "기업";
    default:
      return category;
  }
};

// 우선순위 한글명
export const getPriorityName = (priority: NotificationPriority): string => {
  switch (priority) {
    case "high":
      return "높음";
    case "medium":
      return "보통";
    case "low":
      return "낮음";
    default:
      return priority;
  }
};

// 날짜 포맷팅 (상대적 시간)
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return "방금 전";
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}일 전`;
  }
};

// 알림 카드 스타일 클래스
export const getNotificationCardClass = (isRead: boolean): string => {
  return `transition-all hover:shadow-md ${
    !isRead
      ? "border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
      : ""
  }`;
};

// 제목 스타일 클래스
export const getTitleClass = (isRead: boolean): string => {
  return `font-semibold ${
    !isRead
      ? "text-gray-900 dark:text-white"
      : "text-gray-700 dark:text-gray-300"
  }`;
};

// 필터링 유틸리티 함수들
export const matchesReadFilter = (
  notification: Notification,
  filter: "all" | "unread" | "read"
): boolean => {
  if (filter === "all") return true;
  if (filter === "unread") return !notification.isRead;
  if (filter === "read") return notification.isRead;
  return true;
};

export const matchesCategoryFilter = (
  notification: Notification,
  categoryFilter: NotificationCategory | "all"
): boolean => {
  return categoryFilter === "all" || notification.category === categoryFilter;
};

export const matchesSearchTerm = (
  notification: Notification,
  searchTerm: string
): boolean => {
  if (searchTerm === "") return true;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return (
    notification.title.toLowerCase().includes(lowerSearchTerm) ||
    notification.message.toLowerCase().includes(lowerSearchTerm)
  );
};
