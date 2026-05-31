import { LINES } from "@/core/data/lines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Segment } from "@/core/scoring";

interface LinesUsedProps {
  segments: Segment[];
}

export function LinesUsed({ segments }: LinesUsedProps) {
  if (segments.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Lines Used</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {segments.map((seg, i) => {
            const ld = LINES[seg.line] ?? { name: seg.line, color: "#6b7280" };
            return (
              <Badge
                key={`${seg.line}-${i}`}
                variant="outline"
                className="pl-1 pr-2 py-1 gap-1.5 font-medium"
                style={{ borderColor: ld.color }}
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: ld.color }}
                />
                {ld.name}
                <Badge variant="secondary" className="ml-1 px-1 h-4 text-[10px] rounded-sm">
                  {seg.stns.length} stn
                </Badge>
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
