import { getSegments } from "@/core/scoring";
import { RouteMetrics } from "./RouteMetrics";
import { RouteTabs } from "./RouteTabs";
import { LinesUsed } from "./LinesUsed";
import { RouteTimeline } from "./RouteTimeline";
import { TravelTips } from "./TravelTips";
import { cn } from "@/lib/utils";
import type { AllRoutes } from "@/core/types";

interface ResultsPanelProps {
  routes: AllRoutes;
  activeKey: "fastest" | "least";
  onTabChange: (k: "fastest" | "least") => void;
}

/**
 * Orchestrates the full results view.
 * Renders in order: tabs → metrics → lines → timeline → tips.
 */
export function ResultsPanel({
  routes,
  activeKey,
  onTabChange,
}: ResultsPanelProps) {
  const activeRoute = activeKey === "fastest" ? routes.fast : routes.least;
  const segments = getSegments(activeRoute.path);

  return (
    <div
      id="results-panel"
      className={cn("flex flex-col gap-3 animate-fade-in")}
    >
      {/* Route option selector (hidden when same) */}
      <RouteTabs
        fast={routes.fast}
        least={routes.least}
        same={routes.same}
        activeKey={activeKey}
        onTabChange={onTabChange}
      />

      {/* Key metrics */}
      <RouteMetrics
        stations={activeRoute.stns}
        timeMin={activeRoute.t}
        interchanges={activeRoute.ic}
      />

      {/* Lines used */}
      <LinesUsed segments={segments} />

      {/* Step-by-step timeline */}
      <RouteTimeline path={activeRoute.path} />

      {/* Tips */}
      <TravelTips />
    </div>
  );
}
