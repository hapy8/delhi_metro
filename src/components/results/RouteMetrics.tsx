import { Train, Clock, RefreshCw } from "lucide-react";
import { MetricCard } from "./MetricCard";

interface RouteMetricsProps {
  stations: number;
  timeMin: number;
  interchanges: number;
}

export function RouteMetrics({ stations, timeMin, interchanges }: RouteMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard
        icon={<Train className="size-5 text-blue-500" />}
        value={stations}
        label="Stations"
      />
      <MetricCard
        icon={<Clock className="size-5 text-orange-500" />}
        value={`${timeMin}m`}
        label="Est. Time"
      />
      <MetricCard
        icon={<RefreshCw className="size-5 text-emerald-500" />}
        value={interchanges}
        label="Changes"
      />
    </div>
  );
}
