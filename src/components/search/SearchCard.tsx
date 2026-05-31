import { ArrowDownUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StationSearch } from "./StationSearch";
import { RoutePreference } from "./RoutePreference";
import type { SearchError } from "@/hooks/useRouteSearch";

interface SearchCardProps {
  fromStation: string;
  toStation: string;
  onFromChange: (s: string) => void;
  onToChange: (s: string) => void;
  onSearch: () => void;
  onSwap: () => void;
  preference: "fastest" | "least";
  onPreferenceChange: (p: "fastest" | "least") => void;
  error: SearchError | null;
  onClearError: () => void;
}

const ERROR_MESSAGES: Record<SearchError, string> = {
  EMPTY:         "Please select both source and destination stations.",
  INVALID_FROM:  "Source station is invalid.",
  INVALID_TO:    "Destination station is invalid.",
  SAME_STATION:  "Source and destination cannot be the same.",
  NO_ROUTE:      "No route found between these stations.",
};

export function SearchCard({
  fromStation,
  toStation,
  onFromChange,
  onToChange,
  onSearch,
  onSwap,
  preference,
  onPreferenceChange,
  error,
  onClearError,
}: SearchCardProps) {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div onKeyDown={handleKeyDown} className="flex flex-col gap-4">
      
      <RoutePreference value={preference} onChange={onPreferenceChange} />

      {/* Connected Inputs Container */}
      <div className="bg-card rounded-2xl shadow-sm p-2 flex flex-col relative border border-border/50">
        
        <div className="relative pl-10 pr-12">
          {/* Vertical Connecting Line (Apple Maps style) */}
          <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-muted-foreground/20 rounded-full flex flex-col">
            <div className="size-2 rounded-full border-2 border-primary bg-background absolute -top-1 -left-[3px]" />
            <div className="size-2 rounded-full border-2 border-accent bg-background absolute -bottom-1 -left-[3px]" />
          </div>

          {/* From Input */}
          <div className="relative">
            <StationSearch
              id="from-inp"
              placeholder="Source Station"
              value={fromStation}
              onChange={(v) => { onFromChange(v); onClearError(); }}
              excludeStation={toStation}
            />
          </div>
          
          <div className="h-px bg-border/60 my-0 ml-0 w-full" />

          {/* To Input */}
          <div className="relative">
            <StationSearch
              id="to-inp"
              placeholder="Destination Station"
              value={toStation}
              onChange={(v) => { onToChange(v); onClearError(); }}
              excludeStation={fromStation}
            />
          </div>
        </div>

        {/* Swap Button overlaps the center divider */}
        <Button 
          type="button"
          variant="secondary" 
          size="icon" 
          className="absolute right-4 top-1/2 -translate-y-1/2 size-9 rounded-full shadow-sm bg-secondary text-muted-foreground hover:text-foreground active:scale-95 transition-all"
          onClick={onSwap}
        >
          <ArrowDownUp className="size-4" />
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="rounded-xl border-0 shadow-sm bg-destructive/10 text-destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>
            {ERROR_MESSAGES[error]}
          </AlertDescription>
        </Alert>
      )}

      <Button onClick={onSearch} size="lg" className="rounded-xl w-full text-[16px] font-semibold h-12 shadow-sm">
        Route
      </Button>
    </div>
  );
}
