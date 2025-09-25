/**
 * 공통 유틸리티 함수들
 *
 * UI, 스타일링, 포맷팅 등 전역적으로 사용되는 유틸리티 함수들
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스명을 병합하고 충돌을 해결하는 유틸리티
 * @param inputs 클래스명 배열
 * @returns 병합된 클래스명 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 숫자를 천 단위로 구분하여 포맷팅
 * @param num 포맷팅할 숫자
 * @returns 포맷팅된 문자열 (예: "1,234")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(num);
}

/**
 * 날짜를 한국어 형식으로 포맷팅
 * @param date 포맷팅할 날짜
 * @param options 포맷팅 옵션
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ko-KR", options).format(dateObj);
}

/**
 * 상대적 시간을 표시 (예: "2시간 전", "3일 전")
 * @param date 기준 날짜
 * @returns 상대적 시간 문자열
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - dateObj.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return "방금 전";
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}일 전`;
  }
}

/**
 * 문자열을 안전하게 자르고 말줄임표 추가
 * @param str 자를 문자열
 * @param maxLength 최대 길이
 * @returns 잘린 문자열
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

/**
 * 배열을 청크 단위로 분할
 * @param array 분할할 배열
 * @param size 청크 크기
 * @returns 분할된 배열의 배열
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * 객체의 깊은 복사
 * @param obj 복사할 객체
 * @returns 복사된 객체
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array)
    return obj.map((item) => deepClone(item)) as unknown as T;
  if (typeof obj === "object") {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}
