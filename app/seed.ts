import { Company, Post, Country } from "./types";

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      { yearMonth: "2024-01", emissions: 120 },
      {
        yearMonth: "2024-02",
        emissions: 110
      },
      {
        yearMonth: "2024-03",
        emissions: 95
      }
    ]
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2024-01", emissions: 80 },
      {
        yearMonth: "2024-02",
        emissions: 105
      },
      { yearMonth: "2024-03", emissions: 120 }
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
