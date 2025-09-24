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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import { CompanyEmissionsData, TimeSeriesData } from "../../types";

interface ChartsSectionProps {
  companyEmissionsData: CompanyEmissionsData[];
  timeSeriesData: TimeSeriesData[];
}

export function ChartsSection({
  companyEmissionsData,
  timeSeriesData
}: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
      {/* 기업별 배출량 막대 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>기업별 최신 배출량</CardTitle>
          <CardDescription>각 기업의 최신 CO₂ 배출량</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              latestEmissions: {
                label: "배출량 (톤)"
              }
            }}
            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
          >
            <BarChart data={companyEmissionsData}>
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
              <Bar dataKey="latestEmissions" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 시간별 배출량 추이 */}
      <Card>
        <CardHeader>
          <CardTitle>전체 배출량 추이</CardTitle>
          <CardDescription>월별 총 CO₂ 배출량 변화</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              totalEmissions: {
                label: "총 배출량 (톤)"
              }
            }}
            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
          >
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="yearMonth"
                fontSize={14}
                className="text-sm sm:text-base"
              />
              <YAxis fontSize={14} className="text-sm sm:text-base" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="totalEmissions"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
