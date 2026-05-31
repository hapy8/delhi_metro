import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LINES } from "@/core/data/lines";
import { getPlatform } from "@/core/platforms";
import { terminus } from "@/core/graph";
import type { PathNode } from "@/core/types";
import { cn } from "@/lib/utils";

interface RouteTimelineProps {
  path: PathNode[];
}

export function RouteTimeline({ path }: RouteTimelineProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 pb-3 pt-4 px-4 border-b border-border/50">
        <CardTitle className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">
          Step-by-Step Route
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col w-full">
          {path.map((step, idx) => {
            const nextStep = path[idx + 1] ?? null;
            const isFirst = idx === 0;
            const isLast = idx === path.length - 1;
            const isInterchange =
              step.l && nextStep?.l && nextStep.l !== step.l && nextStep.l !== "WALK";

            const ld = step.l ? LINES[step.l] : null;
            const nextLd = nextStep?.l ? LINES[nextStep.l] : null;
            
            const boardLine = isFirst && nextStep?.l 
              ? nextStep.l 
              : isInterchange && nextStep?.l 
                ? nextStep.l 
                : null;

            const boardInfo = boardLine && nextStep && LINES[boardLine]
              ? (() => {
                  const bld = LINES[boardLine];
                  const term = terminus(boardLine, step.s, nextStep.s);
                  const platform = getPlatform(boardLine, step.s, nextStep.s);
                  return term ? { color: bld.color, name: bld.name, terminus: term, platform } : null;
                })()
              : null;

            return (
              <div 
                key={`${step.s}-${idx}`} 
                className={cn(
                  "flex flex-col relative px-4 py-3.5",
                  !isLast && "border-b border-border/60"
                )}
              >
                <div className="flex items-start gap-3 w-full">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center justify-center pt-1 shrink-0">
                    <div 
                      className={cn(
                        "size-3 rounded-full shadow-sm",
                        isInterchange && "ring-4 ring-muted"
                      )}
                      style={{ 
                        backgroundColor: ld?.color || (isFirst && boardInfo?.color ? boardInfo.color : "var(--muted-foreground)")
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full min-w-0">
                    <span className={cn("text-[15px] truncate", (isFirst || isLast) && "font-semibold")}>
                      {step.s}
                    </span>
                    
                    {/* Interchange Badge */}
                    {isInterchange && nextLd && (
                      <div className="mt-1">
                        <Badge variant="outline" className="w-fit text-[11px] uppercase py-0.5 px-2 bg-background font-medium" style={{ color: nextLd.color, borderColor: nextLd.color }}>
                          <ArrowRight className="size-3 mr-1" />
                          Change to {nextLd.name}
                        </Badge>
                      </div>
                    )}

                    {/* Boarding Instructions */}
                    {boardInfo && (
                      <div className="mt-2.5 rounded-xl bg-muted/50 border border-border/50 p-3 flex flex-col gap-1.5">
                        <p className="font-medium text-[13px] flex items-center gap-2">
                          Board {boardInfo.name}
                          <span className="size-2 rounded-full shadow-sm" style={{ backgroundColor: boardInfo.color }} />
                        </p>
                        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                          {boardInfo.platform && (
                            <p>Platform <span className="font-semibold text-foreground">{boardInfo.platform}</span></p>
                          )}
                          <p>Towards <span className="font-semibold text-foreground">{boardInfo.terminus}</span></p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
