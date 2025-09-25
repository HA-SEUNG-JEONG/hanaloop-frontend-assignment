import { Skeleton } from "@/components/ui/skeleton";

// 기본 스켈레톤 컴포넌트들
export function SkeletonCard({
  className,
  children
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-lg border bg-card p-6 ${className || ""}`}>
      {children || (
        <div className="space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-8 w-1/4" />
        </div>
      )}
    </div>
  );
}

// 페이지별 스켈레톤 레이아웃
export function SkeletonPageLayout({
  title,
  description,
  children
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pt-20">
      <SkeletonHeader title={title} description={description} />
      <main className="container mx-auto px-4 py-8 space-y-8">{children}</main>
    </div>
  );
}

export function SkeletonStatsCard({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg border bg-card p-6 ${className || ""}`}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({
  rows = 5,
  className
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border bg-card ${className || ""}`}>
      <div className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg border bg-card p-6 ${className || ""}`}>
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export function SkeletonHeader({
  title,
  description,
  className
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <header
      className={`border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 container mx-auto px-4 py-6 sm:py-8 text-center space-y-4 ${
        className || ""
      }`}
    >
      <div className="space-y-2">
        <div className="mx-auto">
          {title ? (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
          ) : (
            <Skeleton className="h-8 w-80 mx-auto" />
          )}
        </div>
        <div className="mx-auto">
          {description ? (
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          ) : (
            <Skeleton className="h-5 w-96 mx-auto" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </header>
  );
}

export function SkeletonList({
  items = 5,
  className
}: {
  items?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className || ""}`}>
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 border rounded-lg"
        >
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonFilters({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg border bg-card p-6 ${className || ""}`}>
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonNotificationItem({
  className
}: {
  className?: string;
}) {
  return (
    <div className={`rounded-lg border bg-card p-6 ${className || ""}`}>
      <div className="flex items-start space-x-4">
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <div className="flex items-center gap-2 mt-3">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 추가적인 스켈레톤 컴포넌트들
export function SkeletonButton({
  className,
  size = "default"
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const sizeClasses = {
    sm: "h-8 w-20",
    default: "h-10 w-24",
    lg: "h-12 w-32"
  };

  return <Skeleton className={`${sizeClasses[size]} ${className || ""}`} />;
}

export function SkeletonInput({ className }: { className?: string }) {
  return <Skeleton className={`h-10 w-full ${className || ""}`} />;
}

export function SkeletonSelect({ className }: { className?: string }) {
  return <Skeleton className={`h-10 w-32 ${className || ""}`} />;
}

export function SkeletonBadge({ className }: { className?: string }) {
  return <Skeleton className={`h-6 w-16 rounded-full ${className || ""}`} />;
}

export function SkeletonAvatar({
  size = "default",
  className
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12"
  };

  return (
    <Skeleton
      className={`${sizeClasses[size]} rounded-full ${className || ""}`}
    />
  );
}
