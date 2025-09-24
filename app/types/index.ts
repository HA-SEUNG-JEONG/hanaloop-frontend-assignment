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
