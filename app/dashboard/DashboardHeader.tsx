interface DashboardHeaderProps {
  title: string;
  description: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
