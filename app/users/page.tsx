/**
 * 사용자 관리 페이지
 *
 * 가정:
 * - 사용자는 시스템의 모든 사용자를 관리할 수 있어야 함
 * - 검색, 필터링, 통계 기능이 필요함
 * - 로딩과 에러 상태를 적절히 처리해야 함
 *
 * 아키텍처 개요:
 * - 데이터 상태: 직접 useState로 관리 (단순한 케이스이므로 커스텀 훅 불필요)
 * - UI 상태: 각 컴포넌트에서 독립적으로 관리
 * - 필터 상태: 페이지 레벨에서 직접 관리
 *
 * 렌더링 최적화 노트:
 * - useMemo로 필터링과 통계 계산 최적화 (필요한 경우에만)
 * - 컴포넌트 분리로 불필요한 재렌더링 방지
 * - 로딩/에러 상태는 전역 컴포넌트 활용
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  SkeletonPageLayout,
  SkeletonStatsCard,
  SkeletonCard,
  SkeletonTable
} from "@/components/common/SkeletonComponents";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { UsersPageHeader } from "@/components/common/PageHeader";
import { UsersStatsCards } from "./components/UsersStatsCards";
import { UsersTable } from "./components/UsersTable";
import { UsersFilters } from "./components/UsersFilters";
import { UsersDistributionCharts } from "./components/UsersDistributionCharts";
import { fetchUsers } from "@/lib/api";
import { User, UserFilter, UserStats } from "../types";

type LoadingState = "idle" | "loading" | "success" | "error";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<UserFilter>({
    search: "",
    role: "all",
    status: "all",
    country: "all"
  });

  // 사용자 데이터 로드
  const loadUsers = async () => {
    setLoadingState("loading");
    setError(null);

    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
      setLoadingState("success");
    } catch (error) {
      console.error("사용자 데이터 로딩 실패:", error);
      setError(
        error instanceof Error
          ? error.message
          : "사용자 데이터를 불러오는 중 오류가 발생했습니다."
      );
      setLoadingState("error");
    }
  };

  // 필터링된 사용자 목록 (useMemo는 필터링 로직이 복잡하므로 필요)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // 검색 필터
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const matchesSearch =
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.company.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // 역할 필터
      if (filter.role !== "all" && user.role !== filter.role) {
        return false;
      }

      // 상태 필터
      if (filter.status !== "all" && user.status !== filter.status) {
        return false;
      }

      // 국가 필터
      if (filter.country !== "all" && user.country !== filter.country) {
        return false;
      }

      return true;
    });
  }, [users, filter]);

  // 사용자 통계 (useMemo는 계산이 복잡하므로 필요)
  const userStats = useMemo((): UserStats => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "활성").length;
    const adminUsers = users.filter((user) => user.role === "관리자").length;
    const recentUsers = users.filter((user) => {
      const joinDate = new Date(user.joinDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return joinDate > thirtyDaysAgo;
    }).length;

    return {
      totalUsers,
      activeUsers,
      adminUsers,
      recentUsers
    };
  }, [users]);

  // 사용 가능한 국가 목록 (useMemo는 배열 연산이 있으므로 필요)
  const availableCountries = useMemo(() => {
    return Array.from(new Set(users.map((user) => user.country))).sort();
  }, [users]);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = () => {
    // TODO: 사용자 추가 모달 또는 페이지로 이동
    console.log("새 사용자 추가");
  };

  const handleEditUser = (user: User) => {
    // TODO: 사용자 편집 모달 또는 페이지로 이동
    console.log("사용자 편집:", user);
  };

  const handleManagePermissions = (user: User) => {
    // TODO: 권한 관리 모달 또는 페이지로 이동
    console.log("권한 관리:", user);
  };

  if (loadingState === "loading") {
    return (
      <SkeletonPageLayout
        title="사용자 관리"
        description="시스템 사용자 관리 및 권한 설정"
      >
        {/* Stats Cards Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
          <SkeletonStatsCard />
        </section>

        {/* Charts Section Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkeletonCard>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-48 w-full" />
            </div>
          </SkeletonCard>
          <SkeletonCard>
            <div className="space-y-4">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-48 w-full" />
            </div>
          </SkeletonCard>
        </section>

        {/* Users Table Skeleton */}
        <section>
          <SkeletonTable rows={10} />
        </section>
      </SkeletonPageLayout>
    );
  }

  if (loadingState === "error") {
    return (
      <ErrorState
        message={error || "사용자 데이터를 불러오는 중 오류가 발생했습니다."}
        onRetry={loadUsers}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <UsersPageHeader onAddUser={handleAddUser} />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* 요약 통계 */}
        <UsersStatsCards stats={userStats} />

        {/* 사용자 목록 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>사용자 목록</CardTitle>
                <CardDescription>등록된 모든 사용자 계정</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <UsersFilters
              filter={filter}
              onFilterChange={setFilter}
              availableCountries={availableCountries}
            />
            <UsersTable
              users={filteredUsers}
              onEditUser={handleEditUser}
              onManagePermissions={handleManagePermissions}
            />
          </CardContent>
        </Card>

        {/* 분포 차트 */}
        <UsersDistributionCharts users={users} />
      </div>
    </div>
  );
}
