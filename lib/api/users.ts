import { User } from "@/app/types";
import { delay, jitter, maybeFail } from "./simulation";
import { users } from "@/app/seed";

let _users = [...users];

/**
 * 사용자 관련 API 함수들
 *
 * 가정:
 * - 사용자 데이터는 메모리에서 관리됨
 * - 사용자 생성/수정/삭제는 관리자 권한이 필요함
 * - 이메일은 고유해야 함
 */

export async function fetchUsers(): Promise<User[]> {
  await delay(jitter());
  if (maybeFail())
    throw new Error("사용자 목록을 불러오는 중 오류가 발생했습니다.");
  return _users;
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 생성 중 오류가 발생했습니다.");

  // 이메일 중복 체크
  const existingUser = _users.find((u) => u.email === user.email);
  if (existingUser) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const newUser = { ...user, id: crypto.randomUUID() };
  _users = [..._users, newUser];
  return newUser;
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id">>
): Promise<User | undefined> {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 정보 수정 중 오류가 발생했습니다.");

  // 이메일 중복 체크 (자신 제외)
  if (updates.email) {
    const existingUser = _users.find(
      (u) => u.email === updates.email && u.id !== id
    );
    if (existingUser) {
      throw new Error("이미 존재하는 이메일입니다.");
    }
  }

  _users = _users.map((user) =>
    user.id === id ? { ...user, ...updates } : user
  );
  return _users.find((user) => user.id === id);
}

export async function deleteUser(id: string): Promise<boolean> {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 삭제 중 오류가 발생했습니다.");

  _users = _users.filter((user) => user.id !== id);
  return true;
}

// 사용자 상태 변경 (활성/비활성)
export async function toggleUserStatus(id: string): Promise<User | undefined> {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 상태 변경 중 오류가 발생했습니다.");

  _users = _users.map((user) =>
    user.id === id
      ? { ...user, status: user.status === "활성" ? "비활성" : "활성" }
      : user
  );
  return _users.find((user) => user.id === id);
}

// 사용자 검색
export async function searchUsers(query: string): Promise<User[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 검색 중 오류가 발생했습니다.");

  const lowerQuery = query.toLowerCase();
  return _users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.company.toLowerCase().includes(lowerQuery)
  );
}
