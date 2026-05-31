import { Zap, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoutePreferenceProps {
  value: "fastest" | "least";
  onChange: (pref: "fastest" | "least") => void;
}

/**
 * Toggle group for selecting route preference.
 * Uses shadcn-style pill toggle pattern.
 */
export function RoutePreference({ value, onChange }: RoutePreferenceProps) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-1.5">
        Route Preference
      </legend>
      <div
        role="group"
        className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-secondary/50 border border-border"
      >
        <PrefButton
          id="pref-fastest"
          label="Fastest"
          description="Minimum travel time"
          icon={<Zap className="size-3.5" />}
          isActive={value === "fastest"}
          onClick={() => onChange("fastest")}
        />
        <PrefButton
          id="pref-least"
          label="Least Changes"
          description="Fewest interchanges"
          icon={<RefreshCw className="size-3.5" />}
          isActive={value === "least"}
          onClick={() => onChange("least")}
        />
      </div>
    </fieldset>
  );
}

interface PrefButtonProps {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function PrefButton({ id, label, description, icon, isActive, onClick }: PrefButtonProps) {
  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={isActive}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-0.5 rounded-lg px-3 py-2.5",
        "text-left transition-all duration-200 select-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        isActive
          ? [
              "bg-card text-foreground shadow-sm",
              "border border-ring/30",
              "ring-1 ring-ring/20",
            ]
          : [
              "text-muted-foreground hover:text-foreground",
              "hover:bg-card/50",
              "border border-transparent",
            ]
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 text-xs font-semibold",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
        style={isActive ? { color: "oklch(0.55 0.25 258)" } : undefined}
      >
        {icon}
        {label}
      </span>
      <span className="text-[10px] text-muted-foreground">{description}</span>
    </button>
  );
}
