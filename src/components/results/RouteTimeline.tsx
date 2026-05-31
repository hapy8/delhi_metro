import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LINES } from "@/core/data/lines";
import { getPlatform } from "@/core/platforms";
import { terminus } from "@/core/graph";
import type { PathNode } from "@/core/types";

interface RouteTimelineProps {
  path: PathNode[];
}

/**
 * Animated step-by-step route timeline.
 * Each station shows: line color dot, line bar, station name, boarding info.
 */
export function RouteTimeline({ path }: RouteTimelineProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card shadow-sm p-4",
        "animate-slide-up animate-stagger-3"
      )}
    >
      <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <span
          className="size-1.5 rounded-full"
          style={{ background: "oklch(0.55 0.25 258)" }}
        />
        Step-by-Step Route
      </h2>

      <div className="flex flex-col">
        {path.map((step, idx) => (
          <TimelineStation
            key={`${step.s}-${idx}`}
            step={step}
            nextStep={path[idx + 1] ?? null}
            isFirst={idx === 0}
            isLast={idx === path.length - 1}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineStationProps {
  step: PathNode;
  nextStep: PathNode | null;
  isFirst: boolean;
  isLast: boolean;
  index: number;
}

function TimelineStation({
  step,
  nextStep,
  isFirst,
  isLast,
  index,
}: TimelineStationProps) {
  const isInterchange =
    step.l && nextStep?.l && nextStep.l !== step.l && nextStep.l !== "WALK";

  const ld = step.l ? LINES[step.l] : null;
  const nextLd = nextStep?.l ? LINES[nextStep.l] : null;

  const dotColor = ld?.color ?? "var(--color-foreground)";
  const barColor =
    (isFirst || isInterchange) && nextLd ? nextLd.color : (ld?.color ?? "var(--color-border)");

  // Board instruction
  const boardLine =
    isFirst && nextStep?.l
      ? nextStep.l
      : isInterchange && nextStep?.l
        ? nextStep.l
        : null;

  const boardInfo =
    boardLine && nextStep && LINES[boardLine]
      ? (() => {
          const bld = LINES[boardLine];
          const term = terminus(boardLine, step.s, nextStep.s);
          const platform = getPlatform(boardLine, step.s, nextStep.s);
          return term ? { color: bld.color, name: bld.name, terminus: term, platform } : null;
        })()
      : null;

  // Stagger delay
  const delay = Math.min(index * 35, 400);

  return (
    <div
      className="route-station-row flex gap-3"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center" style={{ width: 20, flexShrink: 0 }}>
        {/* Dot */}
        <div
          className={cn(
            "size-3.5 rounded-full shrink-0 mt-0.5 border-2",
            "transition-all duration-200",
            isInterchange && "ring-2 ring-offset-2 ring-offset-card"
          )}
          style={{
            background: dotColor,
            borderColor: "var(--color-card)",
            boxShadow: isInterchange
              ? `0 0 0 3px ${dotColor}30`
              : (isFirst || isLast) ? `0 0 0 3px ${dotColor}30` : undefined,
          }}
        />
        {/* Bar */}
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-[24px] rounded-full mt-1"
            style={{
              background: barColor,
              opacity: 0.6,
              minHeight: 28,
            }}
          />
        )}
      </div>

      {/* Info column */}
      <div className={cn("flex flex-col gap-1 pb-4 flex-1 min-w-0", isLast && "pb-0")}>
        {/* Interchange badge */}
        {isInterchange && nextLd && (
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 w-fit",
              "text-[10px] font-semibold uppercase tracking-wide"
            )}
            style={{
              background: `${nextLd.color}15`,
              color: nextLd.color,
              border: `1px solid ${nextLd.color}30`,
            }}
          >
            <ArrowRight className="size-2.5" />
            Interchange → {nextLd.name}
          </div>
        )}

        {/* Station name */}
        <span
          className={cn(
            "text-sm leading-snug",
            isFirst || isLast
              ? "font-semibold text-foreground"
              : "font-normal text-muted-foreground"
          )}
        >
          {step.s}
        </span>

        {/* Current line */}
        {ld && (
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: ld.color }}>
            <span className="size-1.5 rounded-full" style={{ background: ld.color }} />
            {ld.name}
          </span>
        )}

        {/* Board instruction */}
        {boardInfo && (
          <div
            className="mt-1 flex items-center flex-wrap gap-1.5 rounded-lg px-2.5 py-1.5 w-fit"
            style={{
              background: `${boardInfo.color}10`,
              border: `1px solid ${boardInfo.color}25`,
            }}
          >
            <span className="text-[10px] font-semibold" style={{ color: boardInfo.color }}>
              🚇 Board {boardInfo.name}
            </span>
            {boardInfo.platform !== null && (
              <span className="text-[10px] text-muted-foreground">
                · Platform {boardInfo.platform}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground">→ towards</span>
            <span className="text-[10px] font-semibold text-foreground">
              {boardInfo.terminus}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
