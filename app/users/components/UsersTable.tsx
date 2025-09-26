/**
 * 사용자 테이블 컴포넌트
 *
 * 가정:
 * - 사용자 목록은 검색 및 필터링이 가능해야 함
 * - 각 사용자에 대한 액션 버튼이 필요함
 * - 역할과 상태에 따른 시각적 구분이 필요함
 *
 * 디자인 의사결정:
 * - 일관된 테이블 패턴
 * - 역할/상태별 배지 색상 구분
 * - 액션 버튼 그룹화
 */

import { Mail, Edit, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { User, UserRole, UserStatus } from "@/app/types";

interface UsersTableProps {
  users: User[];
  onEditUser?: (user: User) => void;
  onManagePermissions?: (user: User) => void;
}

export function UsersTable({
  users,
  onEditUser,
  onManagePermissions
}: UsersTableProps) {
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "관리자":
        return "destructive";
      case "감사자":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: UserStatus) => {
    return status === "활성" ? "default" : "outline";
  };

  return (
    <div className="space-y-4">
      {/* 모바일: 카드 형태 */}
      <div className="block lg:hidden space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 space-y-3 bg-card"
          >
            {/* 사용자 정보 */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm sm:text-base truncate">
                  {user.name}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground flex items-center mt-1">
                  <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 ml-2">
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className="text-xs w-16 flex items-center justify-center"
                >
                  {user.role}
                </Badge>
                <Badge
                  variant={getStatusBadgeVariant(user.status)}
                  className="text-xs w-16 flex items-center justify-center"
                >
                  {user.status}
                </Badge>
              </div>
            </div>

            {/* 회사 및 국가 정보 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">회사:</span>
                <span className="text-xs sm:text-sm font-medium">
                  {user.company}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">국가:</span>
                <Badge variant="outline" className="text-xs">
                  {user.country}
                </Badge>
              </div>
            </div>

            {/* 날짜 정보 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-muted-foreground">
              <div>마지막 로그인: {user.lastLogin}</div>
              <div className="hidden sm:inline">•</div>
              <div>가입일: {user.joinDate}</div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => onEditUser?.(user)}
              >
                <Edit className="h-3 w-3 mr-1" />
                편집
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => onManagePermissions?.(user)}
              >
                <Shield className="h-3 w-3 mr-1" />
                권한
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 데스크톱: 테이블 형태 */}
      <div className="hidden lg:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">사용자</TableHead>
              <TableHead className="w-[100px]">역할</TableHead>
              <TableHead className="w-[150px]">회사</TableHead>
              <TableHead className="w-[100px]">국가</TableHead>
              <TableHead className="w-[100px]">상태</TableHead>
              <TableHead className="w-[120px]">마지막 로그인</TableHead>
              <TableHead className="w-[100px]">가입일</TableHead>
              <TableHead className="w-[150px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getRoleBadgeVariant(user.role)}
                    className="w-16 flex items-center justify-center"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{user.company}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="w-16 flex items-center justify-center"
                  >
                    {user.country}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getStatusBadgeVariant(user.status)}
                    className="w-16 flex items-center justify-center"
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastLogin}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.joinDate}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => onEditUser?.(user)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      편집
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => onManagePermissions?.(user)}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      권한
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
