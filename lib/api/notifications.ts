import { Notification } from "@/app/types";
import { delay, jitter, maybeFail } from "./simulation";

// 샘플 알림 데이터
const sampleNotifications: Notification[] = [
  {
    id: 1,
    title: "배출량 임계값 초과",
    message: "중국(CN)의 CO₂ 배출량이 설정된 임계값을 초과했습니다.",
    type: "warning",
    isRead: false,
    createdAt: "2024-01-15T10:30:00Z",
    priority: "high",
    category: "emission"
  },
  {
    id: 2,
    title: "새로운 보고서 제출",
    message: "삼성전자가 2024년 지속가능성 보고서를 제출했습니다.",
    type: "info",
    isRead: false,
    createdAt: "2024-01-15T09:15:00Z",
    priority: "medium",
    category: "report"
  },
  {
    id: 3,
    title: "시스템 업데이트 완료",
    message: "배출량 모니터링 시스템이 성공적으로 업데이트되었습니다.",
    type: "success",
    isRead: true,
    createdAt: "2024-01-14T16:45:00Z",
    priority: "low",
    category: "system"
  },
  {
    id: 4,
    title: "데이터 동기화 오류",
    message: "일부 국가 데이터 동기화 중 오류가 발생했습니다.",
    type: "error",
    isRead: true,
    createdAt: "2024-01-14T14:20:00Z",
    priority: "high",
    category: "system"
  },
  {
    id: 5,
    title: "새로운 기업 등록",
    message: "LG전자가 시스템에 새로 등록되었습니다.",
    type: "info",
    isRead: true,
    createdAt: "2024-01-14T11:30:00Z",
    priority: "medium",
    category: "company"
  },
  {
    id: 6,
    title: "월간 보고서 생성",
    message: "2024년 1월 월간 배출량 보고서가 생성되었습니다.",
    type: "success",
    isRead: true,
    createdAt: "2024-01-13T18:00:00Z",
    priority: "low",
    category: "report"
  }
];

let _notifications = [...sampleNotifications];

/**
 * 알림 관련 API 함수들
 *
 * 가정:
 * - 알림 데이터는 메모리에서 관리됨
 * - 실시간 업데이트는 현재 구현되지 않음
 * - 읽음 처리와 삭제는 즉시 반영됨
 */

export async function fetchNotifications(): Promise<Notification[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("알림을 불러오는 중 오류가 발생했습니다.");
  return _notifications;
}

export async function markNotificationAsRead(
  id: number
): Promise<Notification[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("알림 읽음 처리 중 오류가 발생했습니다.");

  _notifications = _notifications.map((notification) =>
    notification.id === id ? { ...notification, isRead: true } : notification
  );
  return _notifications;
}

export async function deleteNotification(id: number): Promise<Notification[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("알림 삭제 중 오류가 발생했습니다.");

  _notifications = _notifications.filter(
    (notification) => notification.id !== id
  );
  return _notifications;
}

// 모든 알림을 읽음 처리
export async function markAllNotificationsAsRead(): Promise<Notification[]> {
  await delay(jitter());
  if (maybeFail())
    throw new Error("모든 알림 읽음 처리 중 오류가 발생했습니다.");

  _notifications = _notifications.map((notification) => ({
    ...notification,
    isRead: true
  }));
  return _notifications;
}

// 새 알림 생성
export async function createNotification(
  notification: Omit<Notification, "id">
): Promise<Notification> {
  await delay(jitter());
  if (maybeFail()) throw new Error("알림 생성 중 오류가 발생했습니다.");

  const newNotification = {
    ...notification,
    id: Math.max(..._notifications.map((n) => n.id)) + 1
  };
  _notifications = [..._notifications, newNotification];
  return newNotification;
}
