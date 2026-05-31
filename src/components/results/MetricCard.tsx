import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  className?: string;
}

export function MetricCard({
  icon,
  value,
  label,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
        <div className="text-muted-foreground">
          {icon}
        </div>
        <div className="flex flex-col gap-0">
          <span className="text-xl font-bold tracking-tight text-foreground tabular-nums leading-none">
            {value}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
            {label}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
