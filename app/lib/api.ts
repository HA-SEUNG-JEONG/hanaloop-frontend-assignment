import { companies, posts, countries } from "../seed";
import { Post, Notification, User } from "../types";

let _countries = [...countries];
let _companies = [...companies];
let _posts = [...posts];

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

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;
export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}
export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

// 특정 회사의 계열사 목록 조회
export async function fetchSubsidiaries(companyId: string) {
  await delay(jitter());
  if (maybeFail())
    throw new Error("계열사 정보를 불러오는 중 오류가 발생했습니다.");

  const company = _companies.find((c) => c.id === companyId);
  if (!company) {
    throw new Error("회사를 찾을 수 없습니다.");
  }

  return company.subsidiaries;
}

// 회사별 총 배출량 계산 (본사 + 계열사)
export async function fetchCompanyTotalEmissions(companyId: string) {
  await delay(jitter());
  if (maybeFail())
    throw new Error("배출량 정보를 불러오는 중 오류가 발생했습니다.");

  const company = _companies.find((c) => c.id === companyId);
  if (!company) {
    throw new Error("회사를 찾을 수 없습니다.");
  }

  // 본사 배출량과 계열사 배출량을 합산
  const allEmissions = [
    ...company.emissions,
    ...company.subsidiaries.flatMap((s) => s.emissions)
  ];

  // 월별로 그룹화하여 합산
  const monthlyTotals = allEmissions.reduce((acc, emission) => {
    const existing = acc.find((e) => e.yearMonth === emission.yearMonth);
    if (existing) {
      existing.emissions += emission.emissions;
    } else {
      acc.push({ ...emission });
    }
    return acc;
  }, [] as typeof company.emissions);

  return monthlyTotals.sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));
}
export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

export async function fetchNotifications() {
  await delay(jitter());
  if (maybeFail()) throw new Error("알림을 불러오는 중 오류가 발생했습니다.");
  return _notifications;
}

export async function markNotificationAsRead(id: number) {
  await delay(jitter());
  if (maybeFail()) throw new Error("알림 읽음 처리 중 오류가 발생했습니다.");
  _notifications = _notifications.map((notification) =>
    notification.id === id ? { ...notification, isRead: true } : notification
  );
  return _notifications;
}

export async function deleteNotification(id: number) {
  await delay(jitter());
  if (maybeFail()) throw new Error("알림 삭제 중 오류가 발생했습니다.");
  _notifications = _notifications.filter(
    (notification) => notification.id !== id
  );
  return _notifications;
}

export async function createOrUpdatePost(
  p: Omit<Post, "id"> & {
    id?: string;
  }
) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");
  if (p.id) {
    _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
    return p as Post;
  }
  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}

// 사용자 관련 API 함수들
export async function fetchUsers() {
  await delay(jitter());
  if (maybeFail())
    throw new Error("사용자 목록을 불러오는 중 오류가 발생했습니다.");
  return _users;
}

export async function createUser(user: Omit<User, "id">) {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 생성 중 오류가 발생했습니다.");
  const newUser = { ...user, id: crypto.randomUUID() };
  _users = [..._users, newUser];
  return newUser;
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id">>
) {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 정보 수정 중 오류가 발생했습니다.");
  _users = _users.map((user) =>
    user.id === id ? { ...user, ...updates } : user
  );
  return _users.find((user) => user.id === id);
}

export async function deleteUser(id: string) {
  await delay(jitter());
  if (maybeFail()) throw new Error("사용자 삭제 중 오류가 발생했습니다.");
  _users = _users.filter((user) => user.id !== id);
  return true;
}
