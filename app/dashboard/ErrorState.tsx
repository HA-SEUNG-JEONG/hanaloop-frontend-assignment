import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

export function ErrorState({
  message = "데이터를 불러오는 중 오류가 발생했습니다.",
  onRetry,
  title = "오류가 발생했습니다",
  className
}: ErrorStateProps) {
  return (
    <div className={`min-h-screen bg-background pt-20 ${className || ""}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center space-y-6 max-w-md">
            <div className="relative">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {message}
              </p>
            </div>
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                className="gap-2"
                aria-label="다시 시도"
              >
                <RefreshCw className="w-4 h-4" />
                다시 시도
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
