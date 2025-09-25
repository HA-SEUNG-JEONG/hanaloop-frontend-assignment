import { countries } from "@/app/seed";
import { Country } from "@/app/types";
import { delay, jitter, maybeFail } from "./simulation";

let _countries = [...countries];

/**
 * 국가 관련 API 함수들
 *
 * 가정:
 * - 국가 데이터는 메모리에서 관리됨
 * - 국가 데이터는 상대적으로 정적 데이터
 * - 지역별 필터링과 검색 기능 제공
 */

export async function fetchCountries(): Promise<Country[]> {
  await delay(jitter());
  return _countries;
}

// 지역별 국가 조회
export async function fetchCountriesByRegion(
  region: string
): Promise<Country[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("지역별 국가 조회 중 오류가 발생했습니다.");

  return _countries.filter((country) => country.region === region);
}

// 국가 검색
export async function searchCountries(query: string): Promise<Country[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("국가 검색 중 오류가 발생했습니다.");

  const lowerQuery = query.toLowerCase();
  return _countries.filter(
    (country) =>
      country.name.toLowerCase().includes(lowerQuery) ||
      country.code.toLowerCase().includes(lowerQuery)
  );
}

// 배출량 기준 상위 국가 조회
export async function fetchTopEmittingCountries(
  limit: number = 10
): Promise<Country[]> {
  await delay(jitter());
  if (maybeFail())
    throw new Error("상위 배출 국가 조회 중 오류가 발생했습니다.");

  return [..._countries]
    .sort((a, b) => b.emissions - a.emissions)
    .slice(0, limit);
}

// GDP 기준 상위 국가 조회
export async function fetchTopGDPCountries(
  limit: number = 10
): Promise<Country[]> {
  await delay(jitter());
  if (maybeFail())
    throw new Error("상위 GDP 국가 조회 중 오류가 발생했습니다.");

  return [..._countries].sort((a, b) => b.gdp - a.gdp).slice(0, limit);
}

// 특정 국가 상세 정보 조회
export async function fetchCountryById(
  id: string
): Promise<Country | undefined> {
  await delay(jitter());
  if (maybeFail()) throw new Error("국가 정보 조회 중 오류가 발생했습니다.");

  return _countries.find((country) => country.id === id);
}

// 사용 가능한 지역 목록 조회
export async function fetchAvailableRegions(): Promise<string[]> {
  await delay(jitter());
  if (maybeFail()) throw new Error("지역 목록 조회 중 오류가 발생했습니다.");

  return Array.from(
    new Set(_countries.map((country) => country.region))
  ).sort();
}
