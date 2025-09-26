# HanaLoop 배출량 대시보드

전 세계 국가별 및 기업별 CO₂ 배출량을 모니터링하는 현대적인 대시보드 애플리케이션입니다.

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 린팅
npm run lint
```

## ✨ 주요 기능

### 📊 대시보드 기능

- **실시간 통계**: 총 배출량, 1인당 배출량, 등록 기업 수, 보고서 수
- **트렌드 분석**: 전년 대비 증감률 및 변화 추이 표시
- **국가별 분석**: 상위 배출 국가 및 지역별 통계
- **최근 보고서**: 기업별 최신 배출량 보고서 조회

### 🏢 기업 및 계열사 관리

- **기업 정보**: 사업 유형, 산업 분야, 설립년도, 직원 수, 연매출
- **계열사 현황**: 지분율, 사업 유형, 설립년도, 직원 수 정보
- **배출량 통합**: 본사와 계열사의 총 배출량 계산 및 표시
- **상세 분석**: 기업별 계열사 구조 및 배출량 분포 분석
- **배출량 편집**: 기업별 GHG 배출량 데이터 추가/삭제/관리
- **보고서 관리**: 기업별 제출된 보고서 조회 및 삭제
- **새 기업 등록**: 시스템에 새로운 기업 추가 및 관리

### 📋 보고서 관리 시스템

- **보고서 작성**: 새 보고서 생성 및 기업별 배출량 데이터 연동
- **보고서 조회**: 제출된 보고서 목록 및 상세 내용 확인
- **보고서 편집**: 기존 보고서 수정 및 업데이트
- **보고서 다운로드**: PDF 및 TXT 형식으로 보고서 내보내기
- **보고서 검색**: 제목 기반 실시간 검색 (디바운싱 적용, 300ms 지연)
- **보고서 삭제**: 안전한 삭제 확인 모달을 통한 보고서 제거
- **기업별 보고서**: 특정 기업의 모든 보고서 조회 및 관리
- **실시간 업데이트**: 페이지 새로고침 없이 데이터 동기화
- **보고서 미리보기**: 작성 중인 보고서의 실시간 미리보기

### 🔔 알림 시스템

- **실시간 알림**: 배출량 임계값 초과, 보고서 제출, 시스템 업데이트
- **알림 필터링**: 읽음/읽지 않음, 카테고리별, 우선순위별 필터
- **검색 기능**: 제목과 내용으로 알림 검색
- **상태 관리**: 읽음 처리, 삭제, 일괄 읽음 처리
- **알림 아이콘**: 카테고리별 시각적 구분

### 👥 사용자 관리

- **사용자 목록**: 시스템 내 모든 사용자 조회 및 관리
- **역할 관리**: 관리자, 감사자, 사용자 권한 구분
- **상태 관리**: 활성/비활성 사용자 상태 관리
- **사용자 통계**: 총 사용자 수, 활성 사용자, 최근 가입자 통계
- **사용자 필터링**: 역할, 상태, 국가별 필터링
- **사용자 검색**: 이름, 이메일 기반 실시간 검색

### 🎨 사용자 경험

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **직관적 인터페이스**: 일관된 UI 컴포넌트와 현대적인 디자인
- **로딩 상태**: 스켈레톤 UI와 애니메이션 로딩 스피너
- **에러 처리**: 사용자 친화적인 에러 메시지와 재시도 기능
- **접근성**: ARIA 라벨, 키보드 네비게이션, 스크린 리더 지원
- **모달 시스템**: shadcn/ui 기반의 일관된 모달 및 다이얼로그
- **삭제 확인**: 안전한 삭제를 위한 AlertDialog 컴포넌트
- **검색 최적화**: 디바운싱을 통한 부드러운 검색 경험
- **실시간 동기화**: 페이지 새로고침 없는 부드러운 데이터 업데이트
- **성능 최적화**: 불필요한 state 제거 및 효율적인 렌더링
- **폼 검증**: React Hook Form과 Zod를 활용한 실시간 유효성 검증
- **테마 지원**: 다크/라이트 모드 지원 (theme-toggle 컴포넌트)

### ⚡ 성능 최적화

- **컴포넌트 분리**: 모듈화된 컴포넌트 구조
- **지연 로딩**: 필요시에만 데이터 로드
- **애니메이션**: 부드러운 전환 효과와 시각적 피드백
- **디바운싱**: 검색 입력에 300ms 디바운싱 적용
- **상태 최적화**: 불필요한 state 제거 및 효율적인 상태 관리
- **데이터 동기화**: 페이지 새로고침 없는 실시간 데이터 업데이트

## 🏗️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **UI Components**: shadcn/ui (Dialog, AlertDialog, Button, Card, Input, Label, Textarea, Select, Table, Badge, Skeleton)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form, Zod (유효성 검증)
- **State Management**: React Hooks (useState, useEffect) - useMemo, useCallback은 현재 코드베이스에서는 과도한 최적화이므로 불필요
- **PDF Generation**: jsPDF 라이브러리를 통한 보고서 PDF 생성
- **Accessibility**: Radix UI 기반 접근성 지원
- **Development**: ESLint, Prettier, PostCSS

## 가정 및 질문

### 가정

- CO₂ 배출량 데이터는 월별 단위로 관리됨 (yearMonth: "2024-01" 형식)
- 기업의 총 배출량은 본사 + 계열사 배출량의 합계로 가정
- 배출량 변화율은 이전 월 대비 백분율로 계산한다고 가정
- API 호출은 15% 확률로 실패하도록 시뮬레이션 (maybeFail 함수)
- 네트워크 지연은 200-800ms 사이의 랜덤 지연으로 시뮬레이션
- 국가 코드는 ISO 표준을 따른다고 가정(ex. CN, US, JP)
- 사용자 역할은 '관리자', '감사자', '사용자' 3개로 구분

### 스스로 해볼 질문

- 캐싱 전략은 어떻게 세울 것인가?
- 실시간 데이터 업데이트(알림 등)는 WebSocket이나 WebRTC를 통해 구현할 것인가?
- 대용량 데이터에 대해서는 페이지네이션을 어떻게 처리할 것인가?
- 다국어 지원이 필요한가?(i18n)
- RTL(오른쪽에서 왼쪽) 언어 지원이 필요한가?
- 이미지가 많이 들어갈 경우 최적화는 어떻게 진행할 것인가? (next/image 혹은 lazy loading 등)
- 기업 데이터가 수십, 수백개 될 경우 검색 성능을 어떻게 더 개선시킬 것인가?
- 대시보드에 로그인 기능을 넣는다면 어떻게 구현할 것이고, 어떤 인증 방식을 사용할 것인가?
- 성능 문제로 useMemo, useCallback 등을 사용해야 한다면 어느 시점에 사용해야 하는가?
- 모바일 및 PC 사용자 비율이 어느정도 되는가?

## 📁 프로젝트 구조

```
app/
├── analytics/          # 분석 페이지
│   ├── components/     # 분석 관련 컴포넌트
│   │   ├── AnalyticsChartsSection.tsx
│   │   ├── AnalyticsStatsCards.tsx
│   │   └── CountriesTable.tsx
│   └── page.tsx
├── dashboard/          # 대시보드 페이지
│   ├── components/     # 대시보드 전용 컴포넌트
│   │   ├── ActionButtons.tsx
│   │   ├── CountryItem.tsx
│   │   ├── MenuButton.tsx
│   │   ├── NavigationDrawer.tsx
│   │   ├── NavigationProvider.tsx
│   │   ├── RecentReports.tsx
│   │   ├── RecentReportsWidget.tsx
│   │   ├── RegionStats.tsx
│   │   ├── StatsGrid.tsx
│   │   └── TopEmittingCountries.tsx
│   └── page.tsx
├── notifications/      # 알림 시스템
│   ├── components/     # 알림 관련 컴포넌트
│   │   ├── NotificationActions.tsx
│   │   ├── NotificationContent.tsx
│   │   ├── NotificationFilters.tsx
│   │   ├── NotificationHeader.tsx
│   │   ├── NotificationIcon.tsx
│   │   └── NotificationItem.tsx
│   └── page.tsx
├── reports/            # 보고서 페이지
│   ├── components/     # 보고서 관련 컴포넌트
│   │   ├── ChartsSection.tsx
│   │   ├── CompaniesTable.tsx
│   │   ├── CompanyDetails.tsx
│   │   ├── CompanyDetailsModal.tsx
│   │   ├── CompanyEmissionsModal.tsx
│   │   ├── EmissionsBadge.tsx
│   │   ├── InfoCard.tsx
│   │   ├── ReportModal.tsx
│   │   ├── ReportPreviewModal.tsx
│   │   ├── ReportsList.tsx
│   │   ├── ReportsStatsCards.tsx
│   │   └── SubsidiariesTable.tsx
│   └── page.tsx
├── users/              # 사용자 관리 페이지
│   ├── components/     # 사용자 관련 컴포넌트
│   │   ├── UsersDistributionCharts.tsx
│   │   ├── UsersFilters.tsx
│   │   ├── UsersStatsCards.tsx
│   │   └── UsersTable.tsx
│   └── page.tsx
├── types/              # TypeScript 타입 정의
│   └── index.ts        # 모든 도메인 타입 정의
├── fonts/              # 폰트 파일
│   ├── GeistMonoVF.woff
│   └── GeistVF.woff
├── favicon.ico         # 파비콘
├── globals.css         # 전역 스타일
├── layout.tsx          # 루트 레이아웃
├── page.tsx            # 홈페이지
└── seed.ts             # 샘플 데이터

components/
├── common/             # 공통 컴포넌트
│   ├── ErrorState.tsx
│   ├── LoadingSpinner.tsx
│   ├── PageHeader.tsx
│   ├── RealtimeStatus.tsx
│   ├── SkeletonComponents.tsx
│   └── StatsCards.tsx
└── ui/                 # 재사용 가능한 UI 컴포넌트 (shadcn/ui)
    ├── alert-dialog.tsx
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── chart.tsx
    ├── dialog.tsx
    ├── input.tsx
    ├── label.tsx
    ├── select.tsx
    ├── skeleton.tsx
    ├── table.tsx
    ├── textarea.tsx
    ├── theme-toggle.tsx
    └── shadcn-io/
        └── spinner/
            └── index.tsx

lib/
├── api/                # API 함수들 (도메인별 분리)
│   ├── companies.ts    # 회사 관련 API
│   ├── countries.ts    # 국가 관련 API
│   ├── notifications.ts # 알림 관련 API
│   ├── posts.ts        # 게시물/보고서 관련 API
│   ├── simulation.ts   # API 시뮬레이션 유틸리티
│   ├── users.ts        # 사용자 관련 API
│   └── index.ts        # 통합 export
├── constants/          # 상수 정의
│   ├── animations.ts   # 애니메이션 상수
│   └── chartColors.ts  # 차트 색상 상수
├── helpers/            # 도메인별 헬퍼 함수들
│   ├── analyticsUtils.ts # 분석 관련 헬퍼 함수
│   ├── companyUtils.ts # 회사 관련 헬퍼 함수
│   ├── notificationUtils.ts # 알림 관련 헬퍼 함수
│   ├── reportUtils.ts  # 보고서 관련 헬퍼 함수 (PDF/TXT 생성)
│   └── retryUtils.ts   # 재시도 관련 유틸리티
├── hooks/              # 커스텀 훅
│   └── useLoadingState.ts # 로딩 상태 관리 훅
└── utils.ts            # 공통 유틸리티 (UI, 포맷팅 등)

# 설정 파일들
├── components.json     # shadcn/ui 설정
├── next.config.mjs     # Next.js 설정
├── package.json        # 프로젝트 의존성
├── postcss.config.mjs  # PostCSS 설정
├── tailwind.config.ts  # Tailwind CSS 설정
└── tsconfig.json       # TypeScript 설정
```

## 🎯 설계 원칙

### 1. 모듈성과 성능

- **도메인별 분리**: API, 유틸리티, 컴포넌트를 도메인별로 명확히 분리
- **중앙 집중식 관리**: 공통 컴포넌트와 유틸리티를 중앙에서 관리
- **컴포넌트 기반 아키텍처**: 재사용 가능한 컴포넌트 설계
- **필요한 경우에만 최적화**: useMemo, useCallback은 정말 필요한 경우에만 사용
- **명확한 관심사 분리**: 각 폴더와 파일의 역할이 명확함

### 2. 사용자 경험

- 직관적인 인터페이스
- 일관된 UI 컴포넌트 사용
- 균형 잡힌 색상 팔레트
- 반응형 레이아웃

### 3. 접근성

- ARIA 라벨과 역할 정의
- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 색상 대비 준수

### 4. 코드 품질

- TypeScript를 통한 타입 안전성
- 명확한 명명법과 구조화
- 재사용 가능한 컴포넌트 설계
- 에러 처리 및 로딩 상태 관리
- 유틸리티 함수를 통한 로직 분리
- 공통 컴포넌트를 통한 코드 재사용성 향상

### 🏢 새 기업 등록 기능

- **일관된 UX 패턴**: 기존 보고서 추가 기능과 동일한 모달 구조
- **포괄적인 폼**: 회사명, 국가, 사업유형, 산업분야, 설립년도, 직원수, 연매출
- **실시간 검증**: React Hook Form과 Zod를 활용한 입력과 동시에 유효성 검증
- **스마트 버튼**: 필수 필드가 모두 입력되면 자동으로 등록 버튼 활성화

### 🔍 폼 검증 시스템

- **글자 수 표시**: 제목과 내용의 실시간 글자 수 카운터
- **범위 검증**: 설립년도, 직원수, 연매출의 범위 설정
- **타입 안전성**: TypeScript와 Zod를 통한 완전한 타입 검증

### 📊 중앙 집중식 데이터 관리

- **통합된 seed.ts**: 모든 샘플 데이터를 한 곳에서 관리
- **타입 안전성**: TypeScript를 활용한 완전한 타입 검증
- **유지보수성**: 데이터 수정 시 한 곳에서만 변경하면 됨

### 📚 API 문서화

- **JSDoc 표준**: 모든 API 함수에 상세한 문서화
- **사용 예제**: 각 함수별 실제 사용 예제 포함
- **타입 정보**: 매개변수, 반환값, 에러 상황 명시

### 🎨 UI/UX 개선사항

- **테마 지원**: 다크/라이트 모드 토글 기능
- **스켈레톤 UI**: 로딩 상태의 시각적 개선
- **애니메이션**: 부드러운 전환 효과와 시각적 피드백
- **반응형 개선**: 모바일과 태블릿에서의 사용성 향상

## 🔧 개발 노트

### 폴더 구조 개선사항

- **API 통합**: 모든 API 함수를 `lib/api/`로 중앙 집중화
- **명확한 네이밍**: `lib/utils/` → `lib/helpers/`로 변경하여 혼동 방지
- **중복 제거**: `lib/api/utils.ts` 중복 파일 제거 (simulation.ts로 통합)
- **컴포넌트 단순화**: 중복된 PageHeader 컴포넌트들을 통합
- **빈 폴더 제거**: 사용하지 않는 빈 `lib/utils/` 폴더 제거
- **중첩 구조 단순화**: `reports/components/common/` 같은 깊은 중첩 제거
- **상수 분리**: 애니메이션과 차트 색상 상수를 별도 파일로 분리
- **훅 관리**: 커스텀 훅을 `lib/hooks/`로 중앙 집중화
- **모달 시스템**: 보고서 관련 모달 컴포넌트들을 체계적으로 구성
- **UI 컴포넌트 확장**: shadcn/ui 기반 컴포넌트 라이브러리 확장
- **보고서 유틸리티**: PDF/TXT 생성 기능을 별도 헬퍼로 분리

### 최근 성능 및 UX 개선사항

- **검색 최적화**: 제목 기반 검색으로 변경, 디바운싱 적용
- **상태 관리 개선**: 불필요한 `isSearching`, `isDebouncing` state 제거
- **데이터 동기화**: 페이지 새로고침 없는 부드러운 데이터 업데이트
- **삭제 UX 개선**: 로딩 상태 없이 즉시 UI 업데이트
- **모달 UX 개선**: 스피너 위치 최적화 및 일관된 로딩 상태
- **메모리 최적화**: 컴포넌트 언마운트 시 타이머 정리
- **보고서 관리 시스템**: 완전한 CRUD 기능을 갖춘 보고서 관리
- **모달 기반 UI**: shadcn/ui Dialog와 AlertDialog를 활용한 일관된 모달 시스템
- **검색 최적화**: 디바운싱을 통한 부드러운 실시간 검색 경험 (제목 기반 검색)
- **PDF/TXT 내보내기**: jsPDF를 활용한 보고서 다운로드 기능
- **기업별 배출량 관리**: GHG 배출량 데이터의 추가/삭제/편집 기능
- **안전한 삭제**: AlertDialog를 통한 삭제 확인 시스템
- **컴포넌트 모듈화**: CountryItem, RecentReportsWidget 등 재사용 가능한 컴포넌트 분리
- **성능 최적화**: 불필요한 state 제거 및 효율적인 데이터 업데이트
- **사용자 경험 개선**: 페이지 새로고침 없는 부드러운 데이터 동기화
- **새 기업 등록 기능**: 기존 보고서 추가와 일관된 패턴의 기업 등록 모달
- **중앙 집중식 데이터 관리**: 모든 샘플 데이터를 seed.ts로 통합 관리
- **API 문서화**: JSDoc을 활용한 상세한 API 함수 문서화
- **폼 검증 시스템**: React Hook Form과 Zod를 통한 폼 검증
- **테마 시스템**: 다크/라이트 모드 지원으로 사용자 선호도 반영
- **스켈레톤 UI**: 로딩 상태의 시각적 개선으로 사용자 경험 향상

### 상태 관리

- 로딩, 성공, 에러 상태의 명확한 분리
- 에러 상태에서의 재시도 기능
- 전역 상태는 최소화하고 로컬 상태 우선 사용

### 렌더링 최적화

- 조건부 렌더링으로 불필요한 DOM 생성 방지
- 애니메이션 지연을 통한 시각적 계층 구조
- 과도한 메모이제이션 지양 (성능 문제가 실제로 발생할 때만 적용)

### 반응형 디자인

- 모바일 퍼스트 접근법
- Tailwind CSS의 반응형 유틸리티 활용
- 터치 친화적인 인터페이스

## 🧪 테스트 방법

### 개발 환경에서 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 주요 테스트 시나리오

1. **대시보드 기능**

   - 통계 카드 데이터 로딩 확인
   - 차트 렌더링 및 인터랙션 테스트
   - 최근 보고서 위젯 동작 확인

2. **기업 관리**

   - 기업 목록 조회 및 필터링
   - 새 기업 등록 폼 검증
   - 기업별 배출량 데이터 관리
   - 계열사 정보 조회

3. **보고서 시스템**

   - 보고서 작성 및 편집
   - PDF/TXT 다운로드 기능
   - 검색 및 필터링
   - 삭제 확인 모달

4. **알림 시스템**

   - 알림 목록 조회
   - 읽음/읽지 않음 상태 변경
   - 필터링 및 검색

5. **사용자 관리**
   - 사용자 목록 및 통계
   - 역할별 필터링
   - 사용자 검색

### API 시뮬레이션

- 15% 확률로 API 실패 시뮬레이션
- 200-800ms 랜덤 지연 시뮬레이션
- 에러 상태 및 재시도 기능 테스트

## 📝 추가 문서

### 아키텍처 개요

- **상태 경계**: 각 페이지별 로컬 상태 관리
- **데이터 흐름**: API → 컴포넌트 → UI 단방향 데이터 흐름
- **컴포넌트 분리**: 도메인별 컴포넌트 분리 및 재사용성

### 렌더링 최적화 노트

- **재렌더링 최소화**: 불필요한 state 제거
- **조건부 렌더링**: 로딩/에러/성공 상태별 렌더링
- **메모이제이션**: 성능 문제 발생 시에만 적용

### 시간 제약으로 인한 트레이드오프

- **실제 API 연동**: 현재는 시뮬레이션 API 사용
- **인증 시스템**: 로그인/로그아웃 기능 미구현
- **실시간 업데이트**: WebSocket 대신 폴링 방식 사용
- **국제화**: 다국어 지원 미구현

### 디자인 의사결정

- **색상 팔레트**: 환경 친화적인 그린 계열 색상 사용
- **레이아웃**: 그리드 기반 반응형 레이아웃
- **모션**: 부드러운 전환 효과로 사용자 경험 향상
- **접근성**: ARIA 라벨과 키보드 네비게이션 지원
