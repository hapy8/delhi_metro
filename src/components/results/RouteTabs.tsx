import { Zap, RefreshCw, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { RouteResult } from "@/core/types";

interface RouteTabsProps {
  fast: RouteResult;
  least: RouteResult;
  same: boolean;
  activeKey: "fastest" | "least";
  onTabChange: (k: "fastest" | "least") => void;
}

/**
 * Side-by-side route option selector.
 * Hidden when both routes are identical (same = true).
 */
export function RouteTabs({
  fast,
  least,
  same,
  activeKey,
  onTabChange,
}: RouteTabsProps) {
  if (same) return null;

  const timeDiff = least.t - fast.t;
  const icDiff = fast.ic - least.ic;

  return (
    <div className="grid grid-cols-2 gap-2 animate-slide-up">
      {/* Fastest */}
      <RouteOption
        id="tab-fastest"
        label="Fastest"
        icon={<Zap className="size-3" />}
        primary={`${fast.t} min`}
        secondary={`${fast.stns} stations · ${fast.ic} change${fast.ic !== 1 ? "s" : ""}`}
        badge={timeDiff > 0 ? `${timeDiff}m faster` : undefined}
        isActive={activeKey === "fastest"}
        onClick={() => onTabChange("fastest")}
      />

      {/* Least interchanges */}
      <RouteOption
        id="tab-least"
        label="Fewer Changes"
        icon={<RefreshCw className="size-3" />}
        primary={`${least.ic} interchange${least.ic !== 1 ? "s" : ""}`}
        secondary={`${least.stns} stations · ${least.t} min`}
        badge={icDiff > 0 ? `${icDiff} fewer change${icDiff !== 1 ? "s" : ""}` : undefined}
        isActive={activeKey === "least"}
        onClick={() => onTabChange("least")}
      />
    </div>
  );
}

interface RouteOptionProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  primary: string;
  secondary: string;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
}

function RouteOption({
  id,
  label,
  icon,
  primary,
  secondary,
  badge,
  isActive,
  onClick,
}: RouteOptionProps) {
  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-1 rounded-xl p-3 text-left",
        "border transition-all duration-200 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive
          ? [
              "border-ring/40 bg-card",
              "ring-1 ring-ring/20 shadow-md",
              "shadow-[0_0_0_1px_oklch(0.55_0.25_258_/_0.15),0_4px_8px_-2px_oklch(0.55_0.25_258_/_0.15)]",
            ]
          : [
              "border-border bg-secondary/30 hover:bg-secondary/60",
              "text-muted-foreground hover:text-foreground",
            ]
      )}
    >
      {/* Label row */}
      <span
        className={cn(
          "flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
        style={isActive ? { color: "oklch(0.55 0.25 258)" } : undefined}
      >
        {icon}
        {label}
        {isActive && (
          <Check className="size-2.5 ml-auto" style={{ color: "oklch(0.55 0.25 258)" }} />
        )}
      </span>

      {/* Primary value */}
      <span className={cn("text-sm font-bold", isActive ? "text-foreground" : "")}>
        {primary}
      </span>

      {/* Secondary stats */}
      <span className="text-[10px] text-muted-foreground">{secondary}</span>

      {/* Best badge */}
      {badge && (
        <Badge
          className="mt-0.5 text-[9px] h-4 px-1.5 font-semibold"
          style={{
            background: "oklch(0.55 0.25 258 / 0.15)",
            color: "oklch(0.68 0.20 258)",
            border: "1px solid oklch(0.55 0.25 258 / 0.25)",
          }}
        >
          ✓ {badge}
        </Badge>
      )}
    </button>
  );
}
