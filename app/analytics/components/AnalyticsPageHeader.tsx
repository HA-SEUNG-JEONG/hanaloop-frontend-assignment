/**
 * Analytics 페이지용 헤더 컴포넌트
 * 
 * 공통 PageHeader 컴포넌트를 사용하여 Analytics 특화 설정을 적용
 */

import { PageHeader } from "@/components/common/PageHeader";

export function AnalyticsPageHeader() {
  return (
    <PageHeader
      title="국가별 배출량 분석"
      description="전 세계 국가별 CO₂ 배출량 상세 분석"
      showBackButton={true}
      showActionButton={false}
    />
  );
}
