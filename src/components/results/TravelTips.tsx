import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const TIPS = [
  "Allow 5–8 extra minutes at interchange stations.",
  "Peak hours: 8–10 AM and 5–8 PM may have longer waits.",
  "Token & Smart Card valid on all DMRC lines.",
  "Board the correct direction — check the terminus sign on the platform.",
] as const;

/**
 * Travel tips card displayed below the route timeline.
 */
export function TravelTips() {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-secondary/20 p-4",
        "animate-slide-up animate-stagger-5"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="flex items-center justify-center size-6 rounded-md"
          style={{
            background: "oklch(0.68 0.25 50 / 0.15)",
            color: "oklch(0.68 0.25 50)",
          }}
        >
          <Lightbulb className="size-3.5" />
        </div>
        <span className="text-xs font-semibold text-foreground">Travel Tips</span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {TIPS.map((tip, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
          >
            <span
              className="size-1 rounded-full mt-1.5 shrink-0"
              style={{ background: "oklch(0.68 0.25 50)" }}
            />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}
