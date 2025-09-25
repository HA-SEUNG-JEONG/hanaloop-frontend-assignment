/**
 * 페이지 재시도 유틸리티 함수
 *
 * 가정:
 * - 모든 페이지에서 동일한 재시도 로직 사용
 * - 단순한 페이지 새로고침으로 충분함
 *
 * 아키텍처:
 * - 전역 유틸리티 함수로 중복 제거
 * - 일관된 재시도 패턴 제공
 */

/**
 * 페이지를 새로고침하는 전역 재시도 함수
 *
 * @description
 * - 모든 페이지에서 동일한 재시도 로직을 사용
 * - ErrorState의 onRetry prop이나 직접 호출에 사용
 * - 단순하고 일관된 사용자 경험 제공
 */
export const handleRetry = (): void => {
  window.location.reload();
};

/**
 * ErrorState 컴포넌트에서 사용할 수 있는 재시도 핸들러
 *
 * @description
 * - ErrorState의 onRetry prop에 직접 전달 가능
 * - 화살표 함수 없이 직접 사용 가능
 */
