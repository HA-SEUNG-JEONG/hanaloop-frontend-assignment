/**
 * 차트 섹션 컴포넌트
 *
 * 디자인 의사결정:
 * - 막대 차트와 파이 차트를 나란히 배치
 * - 반응형 레이아웃으로 모바일에서는 세로 배치
 * - 일관된 색상 팔레트 사용
 *
 * 아키텍처 개요:
 * - CSS 변수와 미디어 쿼리로 반응형 처리
 * - Tailwind CSS 활용으로 일관된 디자인 시스템
 * - JavaScript 로직 최소화로 성능 최적화
 */

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";
import { CHART_COLORS } from "@/lib/constants/chartColors";

interface ChartsSectionProps {
  barChartData: Array<{
    name: string;
    emissions: number;
    population: number;
    gdp: number;
  }>;
  pieChartData: Array<{
    name: string;
    value: number;
  }>;
}

// 파이 차트 라벨 데이터 타입
interface PieChartLabelData {
  name: string;
  percent: number;
  value: number;
}

// 파이 차트 라벨 포맷팅 함수
const formatPieChartLabel = (entry: PieChartLabelData): string => {
  const { name, percent } = entry;
  const percentage = `${(percent * 100).toFixed(0)}%`;
  return `${name} ${percentage}`;
};

export function AnalyticsChartsSection({
  barChartData,
  pieChartData
}: ChartsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  // 컴포넌트 마운트 시 애니메이션 트리거
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
      {/* 상위 10개국 배출량 막대 차트 */}
      <Card
        className={cn(
          "hover-lift transition-all duration-500",
          isVisible ? "animate-fade-in-scale" : "opacity-0 scale-95"
        )}
      >
        <CardHeader>
          <CardTitle className="animate-slide-in-up">
            상위 10개국 배출량
          </CardTitle>
          <CardDescription
            className="animate-slide-in-up"
            style={{ animationDelay: "100ms" }}
          >
            CO₂ 배출량 기준 상위 10개국
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              emissions: {
                label: "배출량 (백만 톤)"
              }
            }}
            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
          >
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={14}
                className="text-sm sm:text-base"
              />
              <YAxis fontSize={14} className="text-sm sm:text-base" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="emissions"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                animationBegin={0}
                animationDuration={1500}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 지역별 배출량 파이 차트 */}
      <Card
        className={cn(
          "hover-lift transition-all duration-500",
          isVisible ? "animate-fade-in-scale" : "opacity-0 scale-95"
        )}
        style={{ animationDelay: "200ms" }}
      >
        <CardHeader>
          <CardTitle className="animate-slide-in-up">
            지역별 배출량 비율
          </CardTitle>
          <CardDescription
            className="animate-slide-in-up"
            style={{ animationDelay: "300ms" }}
          >
            지역별 CO₂ 배출량 분포
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "배출량 (백만 톤)"
              }
            }}
            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
          >
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={formatPieChartLabel}
                outerRadius="var(--pie-outer-radius)"
                innerRadius="var(--pie-inner-radius)"
                fill="#8884d8"
                dataKey="value"
                style={{
                  fontSize: "var(--pie-label-size)"
                }}
                animationBegin={0}
                animationDuration={2000}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
