import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ALL_STATIONS, getStationLineNames } from "@/core/data/stations";
import { LINES } from "@/core/data/lines";

interface StationSearchProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  excludeStation?: string;
}

export function StationSearch({
  id,
  placeholder,
  value,
  onChange,
  excludeStation,
}: StationSearchProps) {
  const [open, setOpen] = React.useState(false);

  const stations = React.useMemo(() => {
    return ALL_STATIONS.map((station) => ({
      value: station,
      label: station,
      disabled: station === excludeStation,
    }));
  }, [excludeStation]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          id={id}
          className={cn(
            "w-full h-12 px-0 text-left text-[15px] bg-transparent outline-none ring-0 border-0 flex items-center",
            !value && "text-muted-foreground"
          )}
        >
          <span className="truncate">{value || placeholder}</span>
        </button>
      </DrawerTrigger>
      
      <DrawerContent className="h-[90vh] flex flex-col rounded-t-[1.5rem] bg-card">
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted-foreground/20" />
        
        <div className="px-4 py-4 border-b border-border/50">
          <h2 className="text-lg font-semibold text-center mb-4">{placeholder}</h2>
        </div>

        <Command className="flex-1 flex flex-col overflow-hidden bg-transparent">
          <div className="px-4 py-2 border-b border-border/50">
            <CommandInput 
              placeholder="Search station..." 
              className="h-10 text-[16px] border-none ring-0 focus:ring-0 bg-muted/50 rounded-lg px-3" 
              autoFocus
            />
          </div>
          
          <CommandList className="flex-1 overflow-y-auto overscroll-y-contain pb-safe">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No station found.
            </CommandEmpty>
            
            <CommandGroup className="px-2">
              {stations.map((station) => {
                const lines = getStationLineNames(station.value);
                return (
                  <CommandItem
                    key={station.value}
                    value={station.value}
                    disabled={station.disabled}
                    onSelect={() => {
                      onChange(station.value);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between py-3.5 rounded-xl mx-1"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Check
                        className={cn(
                          "size-4 shrink-0 text-primary",
                          value === station.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className={cn("truncate text-[16px]", station.disabled && "opacity-40 line-through")}>
                        {station.label}
                      </span>
                    </div>
                    {lines.length > 0 && (
                      <div className="flex items-center gap-1.5 ml-4 shrink-0">
                        {lines.slice(0, 3).map((lineName) => {
                          const lineKey = Object.entries(LINES).find(
                            ([, v]) => v.name === lineName
                          )?.[0];
                          const color = lineKey ? LINES[lineKey]?.color : "#6b7280";
                          return (
                            <span
                              key={lineName}
                              className="size-2.5 rounded-full shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DrawerContent>
    </Drawer>
  );
}
