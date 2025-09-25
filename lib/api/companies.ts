import { Company, GhgEmission, Subsidiary } from "@/app/types";

import { delay, jitter, maybeFail } from "./simulation";
import { companies } from "@/app/seed";

let _companies = [...companies];

/**
 * 회사 관련 API 함수들
 *
 * 가정:
 * - 회사 데이터는 메모리에서 관리됨
 * - 네트워크 지연을 시뮬레이션하기 위한 delay 사용
 * - 15% 확률로 실패 시뮬레이션
 */

export async function fetchCompanies(): Promise<Company[]> {
  await delay(jitter());
  return _companies;
}

// 특정 회사의 계열사 목록 조회
export async function fetchSubsidiaries(
  companyId: string
): Promise<Subsidiary[]> {
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
export async function fetchCompanyTotalEmissions(
  companyId: string
): Promise<GhgEmission[]> {
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

// 회사 생성
export async function createCompany(
  company: Omit<Company, "id">
): Promise<Company> {
  await delay(jitter());
  if (maybeFail()) throw new Error("회사 생성 중 오류가 발생했습니다.");

  const newCompany = { ...company, id: crypto.randomUUID() };
  _companies = [..._companies, newCompany];
  return newCompany;
}

// 회사 정보 수정
export async function updateCompany(
  id: string,
  updates: Partial<Omit<Company, "id">>
): Promise<Company | undefined> {
  await delay(jitter());
  if (maybeFail()) throw new Error("회사 정보 수정 중 오류가 발생했습니다.");

  _companies = _companies.map((company) =>
    company.id === id ? { ...company, ...updates } : company
  );
  return _companies.find((company) => company.id === id);
}

// 회사 삭제
export async function deleteCompany(id: string): Promise<boolean> {
  await delay(jitter());
  if (maybeFail()) throw new Error("회사 삭제 중 오류가 발생했습니다.");

  _companies = _companies.filter((company) => company.id !== id);
  return true;
}
