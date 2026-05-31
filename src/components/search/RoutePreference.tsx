import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RoutePreferenceProps {
  value: "fastest" | "least";
  onChange: (pref: "fastest" | "least") => void;
}

export function RoutePreference({ value, onChange }: RoutePreferenceProps) {
  return (
    <div className="w-full">
      <Tabs 
        value={value} 
        onValueChange={(val) => onChange(val as "fastest" | "least")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-muted/70 p-1 rounded-xl h-9">
          <TabsTrigger value="fastest" className="rounded-lg text-xs font-medium shadow-none data-[state=active]:shadow-sm data-[state=active]:bg-background">
            Fastest Route
          </TabsTrigger>
          <TabsTrigger value="least" className="rounded-lg text-xs font-medium shadow-none data-[state=active]:shadow-sm data-[state=active]:bg-background">
            Fewer Changes
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
