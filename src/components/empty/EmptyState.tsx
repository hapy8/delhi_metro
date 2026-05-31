import { Train } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_STATIONS } from "@/core/data/stations";

/**
 * Empty state shown before any search is performed.
 * Features an animated metro icon and station count.
 */
export function EmptyState() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        "py-12 px-6 text-center",
        "animate-fade-in"
      )}
    >
      {/* Animated icon */}
      <div className="relative">
        <div
          className="flex items-center justify-center size-20 rounded-3xl shadow-xl"
          style={{
            background: "linear-gradient(135deg, oklch(0.55 0.25 258 / 0.2), oklch(0.55 0.25 258 / 0.05))",
            border: "1px solid oklch(0.55 0.25 258 / 0.2)",
          }}
        >
          <Train
            className="size-9"
            style={{ color: "oklch(0.55 0.25 258)" }}
          />
        </div>
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-3xl animate-ping opacity-20"
          style={{
            background: "oklch(0.55 0.25 258 / 0.3)",
            animationDuration: "3s",
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1.5 max-w-xs">
        <h2 className="text-base font-semibold text-foreground">
          Plan your journey
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Search any two stations to get the fastest route with step-by-step directions.
        </p>
      </div>

      {/* Stats pill */}
      <div
        className={cn(
          "flex items-center gap-3 rounded-full px-4 py-2",
          "border border-border bg-secondary/30",
          "text-xs text-muted-foreground"
        )}
      >
        <StatBadge value="10" label="Lines" color="#3B82F6" />
        <span className="w-px h-3 bg-border" />
        <StatBadge value={`${ALL_STATIONS.length}+`} label="Stations" color="#F97316" />
        <span className="w-px h-3 bg-border" />
        <StatBadge value="100%" label="Offline" color="#10B981" />
      </div>
    </div>
  );
}

interface StatBadgeProps {
  value: string;
  label: string;
  color: string;
}

function StatBadge({ value, label, color }: StatBadgeProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="font-bold text-foreground" style={{ color }}>
        {value}
      </span>
      <span>{label}</span>
    </div>
  );
}
