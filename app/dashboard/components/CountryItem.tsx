import { Badge } from "@/components/ui/badge";
import { Country } from "@/app/types";
import { cn } from "@/lib/utils";
import {
  ANIMATION_DELAY,
  PROGRESS_DELAY_OFFSET
} from "@/lib/constants/animations";

// 순위별 색상 스타일
const getRankStyle = (index: number) => {
  const styles = [
    "bg-yellow-100 text-yellow-800 border-yellow-300", // 1위
    "bg-gray-100 text-gray-800 border-gray-300", // 2위
    "bg-orange-100 text-orange-800 border-orange-300" // 3위
  ];
  return styles[index] || "bg-blue-100 text-blue-800 border-blue-300";
};

// 진행률 바 색상
const getProgressBarColor = (index: number) => {
  const colors = ["bg-yellow-500", "bg-gray-500", "bg-orange-500"];
  return colors[index] || "bg-blue-500";
};

// 개별 국가 아이템 컴포넌트 Props
export interface CountryItemProps {
  country: Country;
  index: number;
  maxEmissions: number;
}

export function CountryItem({
  country,
  index,
  maxEmissions
}: CountryItemProps) {
  const percentage = (country.emissions / maxEmissions) * 100;
  const animationDelay = index * ANIMATION_DELAY;
  const progressDelay = animationDelay + PROGRESS_DELAY_OFFSET;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-lg transition-all duration-500",
        "hover:bg-muted/50 hover:scale-[1.02] animate-slide-in-up"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
      role="listitem"
      aria-label={`${index + 1}위: ${
        country.name
      }, 배출량 ${country.emissions.toFixed(0)}M톤`}
    >
      <div className="flex items-center space-x-3">
        <Badge
          variant="outline"
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
            "hover:scale-110",
            getRankStyle(index)
          )}
          aria-label={`${index + 1}위`}
        >
          {index + 1}
        </Badge>
        <div className="flex-1">
          <p className="font-medium">{country.name}</p>
          <p className="text-sm text-muted-foreground">{country.region}</p>
          {/* 진행률 바 */}
          <div
            className="w-full bg-muted rounded-full h-1.5 mt-2"
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={cn(
                "h-1.5 rounded-full transition-all duration-1000 ease-out",
                getProgressBarColor(index)
              )}
              style={{
                width: `${percentage}%`,
                transitionDelay: `${progressDelay}ms`
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">{country.emissions.toFixed(0)}M</p>
        <p className="text-xs text-muted-foreground">톤 CO₂</p>
      </div>
    </div>
  );
}
