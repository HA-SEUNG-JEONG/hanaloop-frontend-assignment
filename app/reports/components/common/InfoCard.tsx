import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  titleBadge?: string;
}

export function InfoCard({
  title,
  description,
  children,
  className = "",
  titleBadge
}: InfoCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {titleBadge && <Badge variant="outline">{titleBadge}</Badge>}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

interface InfoItemProps {
  label: string;
  value?: string | number;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function InfoItem({
  label,
  value,
  badge,
  badgeVariant = "secondary",
  className = ""
}: InfoItemProps) {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="mt-1">
        {badge ? (
          <Badge variant={badgeVariant} className="text-xs">
            {badge}
          </Badge>
        ) : (
          <p className="text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export function StatItem({ label, value, className = "" }: StatItemProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
