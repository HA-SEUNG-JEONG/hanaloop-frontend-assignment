import { Company, Post, Country, Subsidiary } from "./types";

export const companies: Company[] = [
  {
    id: "c1",
    name: "삼성전자",
    country: "KR",
    businessType: "제조업",
    industry: "전자제품",
    establishedYear: 1969,
    employeeCount: 267937,
    revenue: 2790000, // 279조원
    subsidiaries: [
      {
        id: "s1",
        name: "삼성디스플레이",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 84.8,
        establishedYear: 2012,
        employeeCount: 25000,
        emissions: [
          { yearMonth: "2024-01", emissions: 45 },
          { yearMonth: "2024-02", emissions: 42 },
          { yearMonth: "2024-03", emissions: 48 }
        ]
      },
      {
        id: "s2",
        name: "삼성SDI",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 20.7,
        establishedYear: 1970,
        employeeCount: 30000,
        emissions: [
          { yearMonth: "2024-01", emissions: 35 },
          { yearMonth: "2024-02", emissions: 38 },
          { yearMonth: "2024-03", emissions: 32 }
        ]
      }
    ],
    emissions: [
      { yearMonth: "2024-01", emissions: 120 },
      { yearMonth: "2024-02", emissions: 110 },
      { yearMonth: "2024-03", emissions: 95 }
    ]
  },
  {
    id: "c2",
    name: "LG전자",
    country: "KR",
    businessType: "제조업",
    industry: "전자제품",
    establishedYear: 1958,
    employeeCount: 51000,
    revenue: 742000, // 74.2조원
    subsidiaries: [
      {
        id: "s3",
        name: "LG디스플레이",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 81.9,
        establishedYear: 1999,
        employeeCount: 20000,
        emissions: [
          { yearMonth: "2024-01", emissions: 28 },
          { yearMonth: "2024-02", emissions: 25 },
          { yearMonth: "2024-03", emissions: 30 }
        ]
      },
      {
        id: "s4",
        name: "LG화학",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 0, // 별도 상장사
        establishedYear: 1947,
        employeeCount: 18000,
        emissions: [
          { yearMonth: "2024-01", emissions: 55 },
          { yearMonth: "2024-02", emissions: 58 },
          { yearMonth: "2024-03", emissions: 52 }
        ]
      }
    ],
    emissions: [
      { yearMonth: "2024-01", emissions: 80 },
      { yearMonth: "2024-02", emissions: 105 },
      { yearMonth: "2024-03", emissions: 120 }
    ]
  },
  {
    id: "c3",
    name: "현대자동차",
    country: "KR",
    businessType: "제조업",
    industry: "자동차",
    establishedYear: 1967,
    employeeCount: 120000,
    revenue: 1180000, // 118조원
    subsidiaries: [
      {
        id: "s5",
        name: "기아",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 33.9,
        establishedYear: 1944,
        employeeCount: 52000,
        emissions: [
          { yearMonth: "2024-01", emissions: 65 },
          { yearMonth: "2024-02", emissions: 68 },
          { yearMonth: "2024-03", emissions: 62 }
        ]
      },
      {
        id: "s6",
        name: "현대모비스",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 20.8,
        establishedYear: 1977,
        employeeCount: 30000,
        emissions: [
          { yearMonth: "2024-01", emissions: 40 },
          { yearMonth: "2024-02", emissions: 42 },
          { yearMonth: "2024-03", emissions: 38 }
        ]
      }
    ],
    emissions: [
      { yearMonth: "2024-01", emissions: 150 },
      { yearMonth: "2024-02", emissions: 145 },
      { yearMonth: "2024-03", emissions: 160 }
    ]
  },
  {
    id: "c4",
    name: "SK하이닉스",
    country: "KR",
    businessType: "제조업",
    industry: "반도체",
    establishedYear: 1983,
    employeeCount: 35000,
    revenue: 440000, // 44조원
    subsidiaries: [
      {
        id: "s7",
        name: "SK실트론",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 100,
        establishedYear: 1989,
        employeeCount: 2000,
        emissions: [
          { yearMonth: "2024-01", emissions: 15 },
          { yearMonth: "2024-02", emissions: 18 },
          { yearMonth: "2024-03", emissions: 16 }
        ]
      }
    ],
    emissions: [
      { yearMonth: "2024-01", emissions: 90 },
      { yearMonth: "2024-02", emissions: 95 },
      { yearMonth: "2024-03", emissions: 88 }
    ]
  },
  {
    id: "c5",
    name: "포스코",
    country: "KR",
    businessType: "제조업",
    industry: "철강",
    establishedYear: 1968,
    employeeCount: 40000,
    revenue: 760000, // 76조원
    subsidiaries: [
      {
        id: "s8",
        name: "포스코홀딩스",
        country: "KR",
        businessType: "지주회사",
        ownershipPercentage: 100,
        establishedYear: 2000,
        employeeCount: 500,
        emissions: [
          { yearMonth: "2024-01", emissions: 5 },
          { yearMonth: "2024-02", emissions: 5 },
          { yearMonth: "2024-03", emissions: 5 }
        ]
      },
      {
        id: "s9",
        name: "포스코케미칼",
        country: "KR",
        businessType: "제조업",
        ownershipPercentage: 100,
        establishedYear: 1979,
        employeeCount: 8000,
        emissions: [
          { yearMonth: "2024-01", emissions: 25 },
          { yearMonth: "2024-02", emissions: 28 },
          { yearMonth: "2024-03", emissions: 26 }
        ]
      }
    ],
    emissions: [
      { yearMonth: "2024-01", emissions: 200 },
      { yearMonth: "2024-02", emissions: 195 },
      { yearMonth: "2024-03", emissions: 210 }
    ]
  }
];

export const posts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report",
    resourceId: "c1",
    dateTime: "2024-02",
    content: "Quarterly CO2 update"
  }
];

export const countries: Country[] = [
  {
    id: "kr",
    name: "대한민국",
    code: "KR",
    region: "아시아",
    population: 51780000,
    gdp: 1810.0,
    emissions: 659.0
  },
  {
    id: "us",
    name: "미국",
    code: "US",
    region: "북미",
    population: 331900000,
    gdp: 25400.0,
    emissions: 4713.0
  },
  {
    id: "cn",
    name: "중국",
    code: "CN",
    region: "아시아",
    population: 1439000000,
    gdp: 17900.0,
    emissions: 10668.0
  },
  {
    id: "jp",
    name: "일본",
    code: "JP",
    region: "아시아",
    population: 125800000,
    gdp: 4230.0,
    emissions: 1038.0
  },
  {
    id: "de",
    name: "독일",
    code: "DE",
    region: "유럽",
    population: 83200000,
    gdp: 4220.0,
    emissions: 644.0
  },
  {
    id: "gb",
    name: "영국",
    code: "GB",
    region: "유럽",
    population: 67000000,
    gdp: 3100.0,
    emissions: 322.0
  },
  {
    id: "fr",
    name: "프랑스",
    code: "FR",
    region: "유럽",
    population: 67800000,
    gdp: 2930.0,
    emissions: 302.0
  },
  {
    id: "in",
    name: "인도",
    code: "IN",
    region: "아시아",
    population: 1380000000,
    gdp: 3390.0,
    emissions: 2651.0
  },
  {
    id: "br",
    name: "브라질",
    code: "BR",
    region: "남미",
    population: 213000000,
    gdp: 1600.0,
    emissions: 466.0
  },
  {
    id: "ca",
    name: "캐나다",
    code: "CA",
    region: "북미",
    population: 38000000,
    gdp: 2000.0,
    emissions: 536.0
  },
  {
    id: "au",
    name: "호주",
    code: "AU",
    region: "오세아니아",
    population: 25600000,
    gdp: 1550.0,
    emissions: 386.0
  },
  {
    id: "it",
    name: "이탈리아",
    code: "IT",
    region: "유럽",
    population: 59000000,
    gdp: 2100.0,
    emissions: 303.0
  }
];
