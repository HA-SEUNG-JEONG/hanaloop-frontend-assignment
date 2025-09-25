import { Notification } from "@/app/types";
import { delay, jitter, maybeFail } from "./simulation";
import { notifications } from "@/app/seed";

let _notifications = [...notifications];

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
