"use client";

import { useState, useEffect } from "react";
import {
  Notification,
  NotificationFilter,
  NotificationCategory
} from "@/app/types";
import { useLoadingState } from "@/lib/hooks/useLoadingState";
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification as deleteNotificationAPI
} from "@/lib/api";
import { NotificationHeader } from "./components/NotificationHeader";
import { NotificationFilters } from "./components/NotificationFilters";
import { NotificationItem } from "./components/NotificationItem";
import { ErrorState } from "@/components/common/ErrorState";
import {
  SkeletonPageLayout,
  SkeletonFilters,
  SkeletonNotificationItem
} from "@/components/common/SkeletonComponents";
import {
  matchesReadFilter,
  matchesCategoryFilter,
  matchesSearchTerm
} from "@/lib/helpers/notificationUtils";
import { handleRetry } from "@/lib/helpers/retryUtils";

/**
 * 알림 페이지 메인 컴포넌트
 *
 * 가정:
 * - 알림 데이터는 클라이언트 사이드에서 관리됨
 * - 실시간 업데이트는 현재 구현되지 않음
 * - 필터링과 검색은 즉시 반영됨
 *
 * 아키텍처:
 * - 상태 관리: useState로 직접 관리 (커스텀 훅 불필요)
 * - 컴포넌트 분리: Header, Filters, Item, Loading, Error
 * - 로딩/에러 상태: 명확한 상태 분리
 * - 타입 안전성: TypeScript 엄격 모드
 *
 * 렌더링 최적화:
 * - NotificationItem만 memo로 최적화 (리스트 렌더링)
 * - 과도한 최적화 지양
 */
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<
    NotificationCategory | "all"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { loadingState, error, setLoadingState, setError } =
    useLoadingState("loading");

  useEffect(() => {
    const loadNotifications = async () => {
      setLoadingState("loading");
      setError(null);

      try {
        const data = await fetchNotifications();
        setNotifications(data);
        setLoadingState("success");
      } catch (error) {
        console.error("알림 로딩 실패:", error);
        setError(
          error instanceof Error
            ? error.message
            : "알림을 불러오는 중 오류가 발생했습니다."
        );
        setLoadingState("error");
      }
    };

    loadNotifications();
  }, [setLoadingState, setError]);

  // 필터링된 알림 목록
  const filteredNotifications = notifications.filter((notification) => {
    return (
      matchesReadFilter(notification, filter) &&
      matchesCategoryFilter(notification, categoryFilter) &&
      matchesSearchTerm(notification, searchTerm)
    );
  });

  // 읽지 않은 알림 수
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // 알림 읽음 처리
  const markAsRead = async (id: number) => {
    try {
      const updatedNotifications = await markNotificationAsRead(id);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알림 읽음 처리 중 오류가 발생했습니다."
      );
    }
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = async () => {
    try {
      const promises = notifications
        .filter((n) => !n.isRead)
        .map((n) => markNotificationAsRead(n.id));
      await Promise.all(promises);
      // 모든 알림을 읽음 처리한 후 데이터 다시 로드
      handleRetry();
    } catch (error) {
      console.error("모든 알림 읽음 처리 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "모든 알림 읽음 처리 중 오류가 발생했습니다."
      );
    }
  };

  // 알림 삭제
  const deleteNotification = async (id: number) => {
    try {
      const updatedNotifications = await deleteNotificationAPI(id);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("알림 삭제 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "알림 삭제 중 오류가 발생했습니다."
      );
    }
  };

  // 필터가 적용되었는지 확인
  const hasActiveFilters =
    searchTerm !== "" || filter !== "all" || categoryFilter !== "all";

  // 로딩 상태
  if (loadingState === "loading") {
    return (
      <SkeletonPageLayout
        title="알림 센터"
        description="시스템 알림 및 메시지 관리"
      >
        {/* Filters Skeleton */}
        <section>
          <SkeletonFilters />
        </section>

        {/* Notifications List Skeleton */}
        <section>
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonNotificationItem key={i} />
            ))}
          </div>
        </section>
      </SkeletonPageLayout>
    );
  }

  // 에러 상태
  if (loadingState === "error") {
    return (
      <ErrorState
        message={error || "알림을 불러오는 중 오류가 발생했습니다."}
        onRetry={handleRetry}
        title="알림 로딩 오류"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
      />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <NotificationFilters
          filter={filter}
          categoryFilter={categoryFilter}
          searchTerm={searchTerm}
          onFilterChange={setFilter}
          onCategoryFilterChange={setCategoryFilter}
          onSearchTermChange={setSearchTerm}
        />

        <div className="space-y-3 sm:space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="text-muted-foreground text-sm sm:text-base">
                {hasActiveFilters
                  ? "검색 조건에 맞는 알림이 없습니다."
                  : "새로운 알림이 없습니다."}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
