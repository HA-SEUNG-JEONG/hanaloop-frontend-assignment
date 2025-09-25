/**
 * 전역 로딩 스피너 컴포넌트
 *
 * 디자인 의사결정:
 * - 일관된 로딩 UI 패턴
 * - 유연한 메시지 커스터마이징
 * - 접근성 고려
 * - 실시간 애니메이션 효과 추가
 */

import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  variant?: "default" | "pulse" | "dots" | "wave";
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  message = "데이터를 불러오는 중...",
  className,
  variant = "default",
  size = "md"
}: LoadingSpinnerProps) {
  const [dots, setDots] = useState("");

  // 점 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const renderSpinner = () => {
    switch (variant) {
      case "pulse":
        return (
          <div
            className={cn(
              "rounded-full bg-primary animate-pulse-glow",
              sizeClasses[size]
            )}
          />
        );
      case "dots":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-primary animate-bounce",
                  size === "sm"
                    ? "w-2 h-2"
                    : size === "md"
                    ? "w-3 h-3"
                    : "w-4 h-4"
                )}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );
      case "wave":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "bg-primary rounded-sm animate-pulse",
                  size === "sm"
                    ? "w-1 h-4"
                    : size === "md"
                    ? "w-1 h-6"
                    : "w-1 h-8"
                )}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1s"
                }}
              />
            ))}
          </div>
        );
      default:
        return (
          <Spinner
            variant="circle"
            size={size === "sm" ? 24 : size === "md" ? 32 : 48}
            className="text-primary animate-rotate-slow"
          />
        );
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-background flex items-center justify-center",
        className
      )}
    >
      <div className="text-center space-y-6 animate-fade-in-scale">
        <div className="flex justify-center">{renderSpinner()}</div>
        <div className="space-y-2">
          <p className="text-muted-foreground font-medium">
            {message}
            {dots}
          </p>
          <div className="flex justify-center">
            <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
