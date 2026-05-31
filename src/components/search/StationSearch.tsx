import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
    <Drawer open={open} onOpenChange={setOpen} repositionInputs={false}>
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
      
      <DrawerContent className="h-[85dvh] max-h-[calc(100dvh-env(safe-area-inset-top))] flex flex-col rounded-t-[1.5rem] bg-card">
        <div className="mx-auto mt-3 mb-2 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />

        <Command className="flex-1 flex flex-col overflow-hidden bg-transparent">
          <div className="px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-2.5 bg-muted/50 rounded-xl px-3 h-[42px]">
              <Search className="size-4 shrink-0 opacity-50 text-foreground" />
              <CommandPrimitive.Input 
                placeholder={`Search ${placeholder.toLowerCase()}...`}
                className="flex-1 text-[16px] bg-transparent border-none outline-none ring-0 focus:ring-0 placeholder:text-muted-foreground" 
                autoFocus
              />
            </div>
          </div>
          
          <CommandList className="max-h-none flex-1 overflow-y-auto overscroll-y-contain pb-safe">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No station found.
            </CommandEmpty>
            
            <CommandGroup className="p-0">
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
                    className="flex items-center justify-between py-3.5 px-4 mx-0 rounded-none border-b border-border/60 last:border-b-0"
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
