import { WifiOff, Train } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  isOffline: boolean;
}

export function AppHeader({ isOffline }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="w-full max-w-lg h-14 mx-auto flex items-center justify-between px-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Train className="size-4" />
          </div>
          <span className="font-semibold text-[17px] tracking-tight">Metro Navigation</span>
        </div>

        {/* Status */}
        {isOffline && (
          <Badge variant="destructive" className="h-6 rounded-full px-2.5 shadow-sm text-xs border-0">
            <WifiOff className="size-3 mr-1" />
            Offline
          </Badge>
        )}
      </div>
    </header>
  );
}
