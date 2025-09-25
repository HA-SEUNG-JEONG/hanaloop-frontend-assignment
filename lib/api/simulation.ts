/**
 * API 시뮬레이션 유틸리티 함수들
 *
 * 개발 환경에서 API 호출을 시뮬레이션하기 위한 함수들
 * - 네트워크 지연 시뮬레이션
 * - 실패 확률 시뮬레이션
 * - 공통 에러 처리
 *
 * 실제 프로덕션에서는 실제 API 호출로 대체되어야 함
 */

/**
 * 지정된 시간만큼 지연시키는 Promise
 * @param ms 지연 시간 (밀리초)
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 200-800ms 사이의 랜덤한 지연 시간을 반환
 * 실제 네트워크 지연을 시뮬레이션
 */
export const jitter = (): number => 200 + Math.random() * 600;

/**
 * 15% 확률로 true를 반환하여 실패를 시뮬레이션
 * 실제 API 호출에서 발생할 수 있는 에러를 시뮬레이션
 */
export const maybeFail = (): boolean => Math.random() < 0.15;

/**
 * API 호출 시 공통으로 사용되는 지연과 실패 시뮬레이션
 * @param operationName 에러 메시지에 사용될 작업명
 * @returns Promise<void>
 */
export const simulateApiCall = async (operationName: string): Promise<void> => {
  await delay(jitter());
  if (maybeFail()) {
    throw new Error(`${operationName} 중 오류가 발생했습니다.`);
  }
};
