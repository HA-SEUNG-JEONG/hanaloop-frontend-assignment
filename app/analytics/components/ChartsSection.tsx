/**
 * 차트 섹션 컴포넌트
 *
 * 디자인 의사결정:
 * - 막대 차트와 파이 차트를 나란히 배치
 * - 반응형 레이아웃으로 모바일에서는 세로 배치
 * - 일관된 색상 팔레트 사용
 */

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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D"
];

export function ChartsSection({
  barChartData,
  pieChartData
}: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 상위 10개국 배출량 막대 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>상위 10개국 배출량</CardTitle>
          <CardDescription>CO₂ 배출량 기준 상위 10개국</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              emissions: {
                label: "배출량 (백만 톤)"
              }
            }}
            className="h-[400px]"
          >
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="emissions" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 지역별 배출량 파이 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>지역별 배출량 비율</CardTitle>
          <CardDescription>지역별 CO₂ 배출량 분포</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "배출량 (백만 톤)"
              }
            }}
            className="h-[400px]"
          >
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
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
