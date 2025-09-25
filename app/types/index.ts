export type GhgEmission = {
  yearMonth: string; // "2025-01","2025-02"
  source?: string; // gasoline, lpg, diesel, etc
  emissions: number;
};

// 계열사 정보 타입
export type Subsidiary = {
  id: string;
  name: string;
  country: string;
  businessType: string; // 사업 유형 (제조업, 서비스업, 유통업 등)
  ownershipPercentage: number; // 지분율 (0-100)
  establishedYear: number;
  employeeCount: number;
  emissions: GhgEmission[];
};

// 회사 정보 타입
export type Company = {
  id: string;
  name: string;
  country: string;
  businessType: string; // 사업 유형
  industry: string; // 산업 분야
  establishedYear: number;
  employeeCount: number;
  revenue: number; // 연매출 (억원)
  parentCompanyId?: string; // 모회사 ID (계열사인 경우)
  subsidiaries: Subsidiary[]; // 계열사 목록
  emissions: GhgEmission[]; // 회사 및 계열사의 배출량
};

export type Post = {
  id: string;
  title: string;
  resourceId: string; // Company.id
  dateTime: string;
  content: string;
};

export type Country = {
  id: string;
  name: string;
  code: string; // ISO country code
  region: string;
  population: number;
  gdp: number; // GDP in billions USD
  emissions: number; // Total CO2 emissions in million tons
};

export type CompanyEmissionsData = {
  id: string;
  name: string;
  country: string;
  businessType: string;
  industry: string;
  subsidiaryCount: number; // 계열사 수
  latestEmissions: number;
  change: number;
  emissions: GhgEmission[];
};

export type TimeSeriesData = {
  yearMonth: string;
  totalEmissions: number;
};

export type ReportsStats = {
  totalCompanies: number;
  totalReports: number;
  avgEmissions: number;
  companiesWithIncrease: number;
};

export type NotificationType = "success" | "error" | "warning" | "info";
export type NotificationPriority = "high" | "medium" | "low";
export type NotificationCategory = "emission" | "report" | "system" | "company";

export type Notification = {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  priority: NotificationPriority;
  category: NotificationCategory;
};

export type NotificationFilter = "all" | "unread" | "read";

// 사용자 관련 타입
export type UserRole = "관리자" | "감사자" | "사용자";
export type UserStatus = "활성" | "비활성";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  country: string;
  status: UserStatus;
  lastLogin: string;
  joinDate: string;
};

export type UserStats = {
  totalUsers: number;
  activeUsers: number;
  adminUsers: number;
  recentUsers: number;
};

export type UserFilter = {
  search: string;
  role: UserRole | "all";
  status: UserStatus | "all";
  country: string | "all";
};
