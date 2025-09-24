import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  title: string;
  description: string;
  className?: string;
  lastUpdated?: string;
}

export function DashboardHeader({
  title,
  description,
  className,
  lastUpdated
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10",
        "container mx-auto px-4 py-6 sm:py-8 text-center space-y-4",
        className
      )}
      role="banner"
    >
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {lastUpdated && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>마지막 업데이트: {lastUpdated}</span>
        </div>
      )}
    </header>
  );
}
