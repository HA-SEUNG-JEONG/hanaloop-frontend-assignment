/**
 * 실시간 상태 표시 컴포넌트
 *
 * 기능:
 * - 온라인/오프라인 상태 표시
 * - 연결 품질 표시
 * - 마지막 업데이트 시간 표시
 * - 실시간 업데이트 애니메이션
 */

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Wifi, WifiOff, Clock, Activity } from "lucide-react";

interface RealtimeStatusProps {
  lastUpdated?: Date | null;
  isUpdating?: boolean;
  className?: string;
}

export function RealtimeStatus({
  lastUpdated,
  isUpdating = false,
  className
}: RealtimeStatusProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionQuality, setConnectionQuality] = useState<
    "good" | "poor" | "offline"
  >("good");

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setConnectionQuality("offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 연결 품질 시뮬레이션
    const qualityInterval = setInterval(() => {
      if (isOnline) {
        const random = Math.random();
        setConnectionQuality(random > 0.8 ? "poor" : "good");
      }
    }, 10000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(qualityInterval);
    };
  }, [isOnline]);

  const getStatusColor = () => {
    if (!isOnline) return "destructive";
    if (connectionQuality === "poor") return "secondary";
    return "default";
  };

  const getStatusText = () => {
    if (!isOnline) return "오프라인";
    if (connectionQuality === "poor") return "연결 불안정";
    return "실시간";
  };

  const getStatusIcon = () => {
    if (!isOnline) return WifiOff;
    if (connectionQuality === "poor") return Wifi;
    return Activity;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 실시간 상태 */}
      <Badge
        variant={getStatusColor()}
        className={cn(
          "flex items-center gap-1.5 text-xs",
          isOnline && connectionQuality === "good" && "animate-pulse-glow"
        )}
      >
        <StatusIcon className="h-3 w-3" />
        {getStatusText()}
      </Badge>

      {/* 업데이트 중 표시 */}
      {isUpdating && (
        <Badge variant="outline" className="flex items-center gap-1.5 text-xs">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          업데이트 중
        </Badge>
      )}

      {/* 마지막 업데이트 시간 */}
      {lastUpdated && (
        <Badge variant="outline" className="flex items-center gap-1.5 text-xs">
          <Clock className="h-3 w-3" />
          {lastUpdated.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })}
        </Badge>
      )}
    </div>
  );
}
