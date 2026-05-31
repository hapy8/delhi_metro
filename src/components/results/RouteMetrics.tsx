import { Train, Clock, RefreshCw } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface RouteMetricsProps {
  stations: number;
  timeMin: number;
  interchanges: number;
}

/**
 * Three-column grid of route stats: stations, time, interchanges.
 */
export function RouteMetrics({ stations, timeMin, interchanges }: RouteMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <MetricCard
        icon={<Train className="size-4" />}
        value={stations}
        label="Stations"
        accentColor="#3B82F6"
        animationDelay={0}
      />
      <MetricCard
        icon={<Clock className="size-4" />}
        value={`${timeMin}m`}
        label="Est. Time"
        accentColor="#F97316"
        animationDelay={60}
      />
      <MetricCard
        icon={<RefreshCw className="size-4" />}
        value={interchanges}
        label="Interchanges"
        accentColor="#10B981"
        animationDelay={120}
      />
    </div>
  );
}
