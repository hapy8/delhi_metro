import { useState } from "react";
import { ArrowDownUp, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { StationSearch } from "./StationSearch";
import { RoutePreference } from "./RoutePreference";
import type { SearchError } from "@/hooks/useRouteSearch";

interface SearchCardProps {
  fromStation: string;
  toStation: string;
  onFromChange: (s: string) => void;
  onToChange: (s: string) => void;
  onSearch: () => void;
  onSwap: () => void;
  preference: "fastest" | "least";
  onPreferenceChange: (p: "fastest" | "least") => void;
  error: SearchError | null;
  onClearError: () => void;
}

const ERROR_MESSAGES: Record<SearchError, string> = {
  EMPTY:         "Please enter both a source and destination station.",
  INVALID_FROM:  "Source station not found. Please select from the list.",
  INVALID_TO:    "Destination station not found. Please select from the list.",
  SAME_STATION:  "Source and destination must be different stations.",
  NO_ROUTE:      "No route found between these stations. Please try another pair.",
};

/**
 * Main search form — composes StationSearch + RoutePreference + action button.
 */
export function SearchCard({
  fromStation,
  toStation,
  onFromChange,
  onToChange,
  onSearch,
  onSwap,
  preference,
  onPreferenceChange,
  error,
  onClearError,
}: SearchCardProps) {
  const [swapAnimating, setSwapAnimating] = useState(false);

  const handleSwap = () => {
    setSwapAnimating(true);
    setTimeout(() => setSwapAnimating(false), 400);
    onSwap();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card shadow-lg",
        "p-5 flex flex-col gap-4",
        "animate-slide-up"
      )}
      onKeyDown={handleKeyDown}
    >
      {/* Route Preference */}
      <RoutePreference value={preference} onChange={onPreferenceChange} />

      {/* From / Swap / To */}
      <div className="relative flex flex-col gap-2">
        <StationSearch
          id="from-inp"
          label="From Station"
          placeholder="Search source station…"
          value={fromStation}
          onChange={(v) => { onFromChange(v); onClearError(); }}
          excludeStation={toStation}
          variant="from"
        />

        {/* Swap button */}
        <div className="flex justify-center relative z-10 -my-1">
          <button
            type="button"
            aria-label="Swap stations"
            onClick={handleSwap}
            className={cn(
              "size-8 rounded-full",
              "flex items-center justify-center",
              "bg-card border border-border shadow-md",
              "text-muted-foreground hover:text-foreground",
              "hover:border-ring/50 hover:shadow-lg",
              "transition-all duration-200 active:scale-90",
              swapAnimating && "rotate-180"
            )}
            style={{ transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms ease" }}
          >
            <ArrowDownUp className="size-3.5" />
          </button>
        </div>

        <StationSearch
          id="to-inp"
          label="To Station"
          placeholder="Search destination station…"
          value={toStation}
          onChange={(v) => { onToChange(v); onClearError(); }}
          excludeStation={fromStation}
          variant="to"
        />
      </div>

      {/* Error state */}
      {error && (
        <Alert
          variant="destructive"
          className="py-2.5 animate-scale-in border-destructive/30 bg-destructive/10"
        >
          <AlertCircle className="size-3.5" />
          <AlertDescription className="text-xs">
            {ERROR_MESSAGES[error]}
          </AlertDescription>
        </Alert>
      )}

      {/* CTA button */}
      <Button
        id="find-route-btn"
        type="button"
        onClick={onSearch}
        className={cn(
          "w-full h-11 text-sm font-semibold rounded-xl",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "shadow-md hover:shadow-lg hover:-translate-y-px",
          "transition-all duration-200",
          "relative overflow-hidden",
          "after:absolute after:inset-0 after:bg-gradient-to-r",
          "after:from-transparent after:via-white/10 after:to-transparent",
          "after:translate-x-[-200%] hover:after:translate-x-[200%]",
          "after:transition-transform after:duration-700"
        )}
      >
        <ArrowRight data-icon="inline-end" />
        Find Route
      </Button>
    </div>
  );
}
