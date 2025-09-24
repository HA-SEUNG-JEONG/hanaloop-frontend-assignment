type GhgEmission = {
  yearMonth: string; // "2025-01","2025-02"
  source?: string; // gasoline, lpg, diesel, etc
  emissions: number;
};

export type Company = {
  id: string;
  name: string;
  country: string;
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
