import { Spinner } from "@/components/ui/shadcn-io/spinner";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "데이터를 불러오는 중..."
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Spinner variant="circle" size={32} className="text-primary" />
        </div>
        <p className="text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  );
}
