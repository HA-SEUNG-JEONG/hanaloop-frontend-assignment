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

import { Mail } from "lucide-react";
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
import { User, UserRole, UserStatus } from "../../types";

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>사용자</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>회사</TableHead>
            <TableHead>국가</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>마지막 로그인</TableHead>
            <TableHead>가입일</TableHead>
            <TableHead>액션</TableHead>
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
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{user.company}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.country}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(user.status)}>
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
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditUser?.(user)}
                  >
                    편집
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onManagePermissions?.(user)}
                  >
                    권한
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
