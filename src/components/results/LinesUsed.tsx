import { LINES } from "@/core/data/lines";
import { cn } from "@/lib/utils";
import type { Segment } from "@/core/scoring";

interface LinesUsedProps {
  segments: Segment[];
}

/**
 * Horizontal scrollable row of colored line pills.
 * Each pill shows the line color, name, and station count.
 */
export function LinesUsed({ segments }: LinesUsedProps) {
  if (segments.length === 0) return null;

  return (
    <div
      className="rounded-xl border border-border bg-secondary/30 p-3 animate-fade-in"
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        Lines Used
      </p>
      <div className="flex flex-wrap gap-1.5">
        {segments.map((seg, i) => {
          const ld = LINES[seg.line] ?? { name: seg.line, color: "#6b7280" };
          return (
            <LinePill
              key={`${seg.line}-${i}`}
              name={ld.name}
              color={ld.color}
              stationCount={seg.stns.length}
            />
          );
        })}
      </div>
    </div>
  );
}

interface LinePillProps {
  name: string;
  color: string;
  stationCount: number;
}

function LinePill({ name, color, stationCount }: LinePillProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full px-2.5 py-1",
        "text-[11px] font-medium",
        "border transition-colors duration-150"
      )}
      style={{
        background: `${color}15`,
        borderColor: `${color}35`,
        color,
      }}
    >
      <span
        className="size-2 rounded-full shrink-0"
        style={{ background: color }}
      />
      <span>{name}</span>
      <span
        className="ml-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold"
        style={{
          background: `${color}20`,
          color: `${color}CC`,
        }}
      >
        {stationCount} stn
      </span>
    </div>
  );
}
