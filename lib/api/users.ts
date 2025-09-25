import { User } from "@/app/types";
import { delay, jitter, maybeFail } from "./simulation";

// 샘플 사용자 데이터
const sampleUsers: User[] = [
  {
    id: "u1",
    name: "김철수",
    email: "kim@example.com",
    role: "관리자",
    company: "Acme Corp",
    country: "KR",
    status: "활성",
    lastLogin: "2024-01-15",
    joinDate: "2023-06-01"
  },
  {
    id: "u2",
    name: "이영희",
    email: "lee@example.com",
    role: "사용자",
    company: "Globex",
    country: "DE",
    status: "활성",
    lastLogin: "2024-01-14",
    joinDate: "2023-08-15"
  },
  {
    id: "u3",
    name: "John Smith",
    email: "john@example.com",
    role: "사용자",
    company: "Acme Corp",
    country: "US",
    status: "비활성",
    lastLogin: "2024-01-10",
    joinDate: "2023-09-20"
  },
  {
    id: "u4",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "감사자",
    company: "Globex",
    country: "ES",
    status: "활성",
    lastLogin: "2024-01-15",
    joinDate: "2023-11-05"
  },
  {
    id: "u5",
    name: "田中太郎",
    email: "tanaka@example.com",
    role: "사용자",
    company: "TechCorp",
    country: "JP",
    status: "활성",
    lastLogin: "2024-01-13",
    joinDate: "2023-12-01"
  }
];

let _users = [...sampleUsers];

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
