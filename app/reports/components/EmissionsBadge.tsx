import { Badge } from "@/components/ui/badge";

interface EmissionsBadgeProps {
  change: number;
  className?: string;
}

export function EmissionsBadge({ change, className }: EmissionsBadgeProps) {
  if (change > 0) {
    return (
      <Badge variant="destructive" className={`text-xs ${className || ""}`}>
        +{change.toFixed(1)}%
      </Badge>
    );
  }

  if (change < 0) {
    return (
      <Badge variant="default" className={`text-xs ${className || ""}`}>
        {change.toFixed(1)}%
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className={`text-xs ${className || ""}`}>
      0%
    </Badge>
  );
}
