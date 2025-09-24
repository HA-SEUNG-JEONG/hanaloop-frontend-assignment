/**
 * Reports 페이지용 헤더 컴포넌트
 *
 * 공통 PageHeader 컴포넌트를 사용하여 Reports 특화 설정을 적용
 */

import { PageHeader } from "@/components/common/PageHeader";

export function ReportsPageHeader() {
  return (
    <PageHeader
      title="기업 배출량 보고서"
      description="기업별 CO₂ 배출량 모니터링 및 보고서 관리"
      showBackButton={true}
      showActionButton={true}
      actionButtonText="새 보고서 작성"
    />
  );
}
