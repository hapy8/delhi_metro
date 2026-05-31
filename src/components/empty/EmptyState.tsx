import { Train } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_STATIONS } from "@/core/data/stations";

export function EmptyState() {
  return (
    <Card className="border-dashed shadow-none bg-muted/30">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Train className="size-8 text-primary" />
        </div>
        <CardTitle>Plan your journey</CardTitle>
        <CardDescription className="max-w-xs mx-auto">
          Search any two stations to get the fastest route with step-by-step directions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pt-4 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary">10 Lines</Badge>
          <Badge variant="secondary">{ALL_STATIONS.length}+ Stations</Badge>
          <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">100% Offline</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
