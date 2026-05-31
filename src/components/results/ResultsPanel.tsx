import { getSegments } from "@/core/scoring";
import { RouteMetrics } from "./RouteMetrics";

import { LinesUsed } from "./LinesUsed";
import { RouteTimeline } from "./RouteTimeline";
import { TravelTips } from "./TravelTips";
import type { AllRoutes } from "@/core/types";

interface ResultsPanelProps {
  routes: AllRoutes;
  activeKey: "fastest" | "least";
  onTabChange: (k: "fastest" | "least") => void;
}

export function ResultsPanel({
  routes,
  activeKey,
}: ResultsPanelProps) {
  const activeRoute = activeKey === "fastest" ? routes.fast : routes.least;
  const segments = getSegments(activeRoute.path);

  return (
    <div id="results-panel" className="flex flex-col gap-4">
      <RouteMetrics
        stations={activeRoute.stns}
        timeMin={activeRoute.t}
        interchanges={activeRoute.ic}
      />

      <LinesUsed segments={segments} />

      <RouteTimeline path={activeRoute.path} />

      <TravelTips />
    </div>
  );
}
