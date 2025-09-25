/**
 * 통합 API 인덱스 파일
 *
 * 모든 도메인별 API 함수들을 중앙에서 관리하고 export
 * 기존 코드와의 호환성을 위해 기존 함수명 유지
 */

// API 시뮬레이션 유틸리티 함수들
export { delay, jitter, maybeFail, simulateApiCall } from "./simulation";

// Companies API
export {
  fetchCompanies,
  fetchSubsidiaries,
  fetchCompanyTotalEmissions,
  createCompany,
  updateCompany,
  deleteCompany
} from "./companies";

// Notifications API
export {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  markAllNotificationsAsRead,
  createNotification
} from "./notifications";

// Users API
export {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  searchUsers
} from "./users";

// Countries API
export {
  fetchCountries,
  fetchCountriesByRegion,
  searchCountries,
  fetchTopEmittingCountries,
  fetchTopGDPCountries,
  fetchCountryById,
  fetchAvailableRegions
} from "./countries";

// Posts API
export {
  fetchPosts,
  createOrUpdatePost,
  fetchPostsByCompany,
  deletePost,
  searchPosts,
  fetchRecentPosts
} from "./posts";
