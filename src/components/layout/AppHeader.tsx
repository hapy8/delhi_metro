import { WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  isOffline: boolean;
}

/**
 * Top-level app header with glassmorphism, brand logo, and offline indicator.
 */
export function AppHeader({ isOffline }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "glass sticky top-0 z-50",
        "border-b border-white/[0.06]",
        "flex items-center gap-3 px-4",
        "animate-fade-in"
      )}
      style={{ height: "var(--header-height)" }}
    >
      {/* Logo mark */}
      <MetroLogoMark />

      {/* Brand text */}
      <div className="flex flex-col gap-0">
        <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
          Delhi Metro
        </span>
        <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase leading-tight">
          Route Navigator
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Offline badge */}
      {isOffline && (
        <Badge
          variant="outline"
          className="gap-1.5 border-amber-500/30 text-amber-400 bg-amber-500/10 animate-fade-in"
        >
          <WifiOff className="size-3" />
          Offline
        </Badge>
      )}

      {/* Station count pill */}
      <div
        className={cn(
          "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full",
          "text-[10px] font-semibold tracking-wider text-muted-foreground uppercase",
          "bg-secondary border border-border"
        )}
      >
        <span
          className="size-1.5 rounded-full bg-emerald-400 animate-pulse"
          style={{ animationDuration: "2s" }}
        />
        10 Lines · 254 Stations
      </div>
    </header>
  );
}

/** SVG metro logo mark */
function MetroLogoMark() {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl shrink-0",
        "bg-gradient-to-br from-brand-500 to-brand-700 shadow-md"
      )}
      style={{
        width: 36,
        height: 36,
        background: "linear-gradient(135deg, oklch(0.55 0.25 258), oklch(0.40 0.25 258))",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Metro M shape */}
        <path
          d="M3 15V7L10 3L17 7V15"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="6.5"
          y="9.5"
          width="7"
          height="5.5"
          rx="1"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.4"
        />
        {/* Wheels */}
        <circle cx="8" cy="16" r="1" fill="rgba(249,115,22,0.9)" />
        <circle cx="12" cy="16" r="1" fill="rgba(249,115,22,0.9)" />
      </svg>
    </div>
  );
}
