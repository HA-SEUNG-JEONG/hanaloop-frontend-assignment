import { Company, GhgEmission, Subsidiary } from "@/app/types";

import { delay, jitter, maybeFail } from "./simulation";
import { companies } from "@/app/seed";

let _companies = [...companies];

/**
 * 회사 관련 API 함수들
 *
 * @description 회사 및 계열사 관련 데이터를 관리하는 API 모듈입니다.
 * 
 * @features
 * - 회사 목록 조회 및 관리
 * - 계열사 정보 조회
 * - 배출량 데이터 통합 계산
 * - 회사 생성, 수정, 삭제 기능
 * 
 * @assumptions
 * - 회사 데이터는 메모리에서 관리됨
 * - 네트워크 지연을 시뮬레이션하기 위한 delay 사용
 * - 15% 확률로 실패 시뮬레이션
 * - 회사 ID는 UUID 형태로 생성됨
 * 
 * @example
 * ```typescript
 * import { fetchCompanies, createCompany } from '@/lib/api/companies';
 * 
 * // 모든 회사 조회
 * const companies = await fetchCompanies();
 * 
 * // 새 회사 생성
 * const newCompany = await createCompany({
 *   name: "새로운 회사",
 *   country: "KR",
 *   businessType: "제조업",
 *   industry: "전자",
 *   establishedYear: 2024,
 *   employeeCount: 100,
 *   revenue: 1000,
 *   subsidiaries: [],
 *   emissions: []
 * });
 * ```
 */

/**
 * 모든 회사 목록을 조회합니다.
 * 
 * @description 시스템에 등록된 모든 회사의 정보를 반환합니다.
 * 
 * @returns {Promise<Company[]>} 회사 정보 배열
 * 
 * @throws {Error} API 호출 실패 시 에러 발생
 * 
 * @example
 * ```typescript
 * const companies = await fetchCompanies();
 * console.log(`총 ${companies.length}개의 회사가 등록되어 있습니다.`);
 * ```
 */
export async function fetchCompanies(): Promise<Company[]> {
  await delay(jitter());
  return _companies;
}

/**
 * 특정 회사의 계열사 목록을 조회합니다.
 * 
 * @description 지정된 회사 ID에 해당하는 모든 계열사 정보를 반환합니다.
 * 
 * @param {string} companyId - 조회할 회사의 고유 ID
 * 
 * @returns {Promise<Subsidiary[]>} 계열사 정보 배열
 * 
 * @throws {Error} 회사를 찾을 수 없는 경우 또는 API 호출 실패 시 에러 발생
 * 
 * @example
 * ```typescript
 * const subsidiaries = await fetchSubsidiaries("company-123");
 * console.log(`해당 회사는 ${subsidiaries.length}개의 계열사를 보유하고 있습니다.`);
 * ```
 */
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

/**
 * 회사의 총 배출량을 계산합니다 (본사 + 계열사).
 * 
 * @description 지정된 회사의 본사와 모든 계열사의 배출량을 월별로 합산하여 반환합니다.
 * 
 * @param {string} companyId - 배출량을 계산할 회사의 고유 ID
 * 
 * @returns {Promise<GhgEmission[]>} 월별 총 배출량 배열 (날짜순 정렬)
 * 
 * @throws {Error} 회사를 찾을 수 없는 경우 또는 API 호출 실패 시 에러 발생
 * 
 * @example
 * ```typescript
 * const totalEmissions = await fetchCompanyTotalEmissions("company-123");
 * console.log("월별 총 배출량:", totalEmissions);
 * 
 * // 최신 월 배출량 조회
 * const latestEmission = totalEmissions[totalEmissions.length - 1];
 * console.log(`최신 배출량: ${latestEmission.emissions}톤`);
 * ```
 */
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

/**
 * 새로운 회사를 생성합니다.
 * 
 * @description 시스템에 새로운 회사를 등록합니다. ID는 자동으로 UUID로 생성됩니다.
 * 
 * @param {Omit<Company, "id">} company - 생성할 회사 정보 (ID 제외)
 * 
 * @returns {Promise<Company>} 생성된 회사 정보 (ID 포함)
 * 
 * @throws {Error} API 호출 실패 시 에러 발생
 * 
 * @example
 * ```typescript
 * const newCompany = await createCompany({
 *   name: "새로운 회사",
 *   country: "KR",
 *   businessType: "제조업",
 *   industry: "전자",
 *   establishedYear: 2024,
 *   employeeCount: 100,
 *   revenue: 1000,
 *   subsidiaries: [],
 *   emissions: []
 * });
 * console.log("생성된 회사 ID:", newCompany.id);
 * ```
 */
export async function createCompany(
  company: Omit<Company, "id">
): Promise<Company> {
  await delay(jitter());
  if (maybeFail()) throw new Error("회사 생성 중 오류가 발생했습니다.");

  const newCompany = { ...company, id: crypto.randomUUID() };
  _companies = [..._companies, newCompany];
  return newCompany;
}

/**
 * 회사 정보를 수정합니다.
 * 
 * @description 지정된 회사의 정보를 부분적으로 업데이트합니다.
 * 
 * @param {string} id - 수정할 회사의 고유 ID
 * @param {Partial<Omit<Company, "id">>} updates - 수정할 필드들
 * 
 * @returns {Promise<Company | undefined>} 수정된 회사 정보 또는 undefined (회사를 찾을 수 없는 경우)
 * 
 * @throws {Error} API 호출 실패 시 에러 발생
 * 
 * @example
 * ```typescript
 * const updatedCompany = await updateCompany("company-123", {
 *   name: "수정된 회사명",
 *   employeeCount: 200
 * });
 * 
 * if (updatedCompany) {
 *   console.log("회사 정보가 수정되었습니다:", updatedCompany.name);
 * }
 * ```
 */
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

/**
 * 회사를 삭제합니다.
 * 
 * @description 지정된 회사를 시스템에서 완전히 제거합니다.
 * 
 * @param {string} id - 삭제할 회사의 고유 ID
 * 
 * @returns {Promise<boolean>} 삭제 성공 여부 (항상 true)
 * 
 * @throws {Error} API 호출 실패 시 에러 발생
 * 
 * @example
 * ```typescript
 * const success = await deleteCompany("company-123");
 * if (success) {
 *   console.log("회사가 성공적으로 삭제되었습니다.");
 * }
 * ```
 */
export async function deleteCompany(id: string): Promise<boolean> {
  await delay(jitter());
  if (maybeFail()) throw new Error("회사 삭제 중 오류가 발생했습니다.");

  _companies = _companies.filter((company) => company.id !== id);
  return true;
}
