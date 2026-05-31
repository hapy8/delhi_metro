import { Zap, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { RouteResult } from "@/core/types";

interface RouteTabsProps {
  fast: RouteResult;
  least: RouteResult;
  same: boolean;
  activeKey: "fastest" | "least";
  onTabChange: (k: "fastest" | "least") => void;
}

export function RouteTabs({
  fast,
  least,
  same,
  activeKey,
  onTabChange,
}: RouteTabsProps) {
  if (same) return null;

  const timeDiff = least.t - fast.t;
  const icDiff = fast.ic - least.ic;

  return (
    <Tabs 
      value={activeKey} 
      onValueChange={(val) => onTabChange(val as "fastest" | "least")}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 h-auto p-1">
        <TabsTrigger 
          value="fastest" 
          className="flex flex-col items-center gap-1.5 py-3 data-[state=active]:shadow-sm"
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <Zap className="size-4 text-blue-500" />
            Fastest
          </div>
          <span className="text-xs text-muted-foreground font-normal">
            {fast.t} min · {fast.ic} change{fast.ic !== 1 ? "s" : ""}
          </span>
          {timeDiff > 0 && (
            <Badge variant="secondary" className="mt-1 text-[10px] h-4 px-1.5 font-normal">
              {timeDiff}m faster
            </Badge>
          )}
        </TabsTrigger>
        
        <TabsTrigger 
          value="least" 
          className="flex flex-col items-center gap-1.5 py-3 data-[state=active]:shadow-sm"
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <RefreshCw className="size-4 text-orange-500" />
            Fewer Changes
          </div>
          <span className="text-xs text-muted-foreground font-normal">
            {least.t} min · {least.ic} change{least.ic !== 1 ? "s" : ""}
          </span>
          {icDiff > 0 && (
            <Badge variant="secondary" className="mt-1 text-[10px] h-4 px-1.5 font-normal">
              {icDiff} fewer
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
