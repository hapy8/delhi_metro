import { cn } from "@/lib/utils";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accentColor?: string;
  className?: string;
  animationDelay?: number;
}

/**
 * A single stat card: icon + big value + label.
 * Used in the route metrics grid.
 */
export function MetricCard({
  icon,
  value,
  label,
  accentColor,
  className,
  animationDelay = 0,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl p-3 text-center",
        "bg-secondary/50 border border-border",
        "animate-count-up",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div
        className="flex items-center justify-center size-8 rounded-lg mb-0.5"
        style={{
          background: accentColor
            ? `${accentColor}18`
            : "oklch(0.55 0.25 258 / 0.1)",
          color: accentColor ?? "oklch(0.55 0.25 258)",
        }}
      >
        {icon}
      </div>
      <span className="text-lg font-bold leading-none text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}
