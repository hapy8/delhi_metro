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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full h-12 px-0 text-left text-[15px] bg-transparent outline-none ring-0 border-0 flex items-center",
            !value && "text-muted-foreground"
          )}
        >
          <span className="truncate">{value || placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-4rem)] max-w-[400px] p-0 rounded-xl shadow-lg" align="start">
        <Command>
          <CommandInput placeholder="Search station..." className="h-11 border-none ring-0 focus:ring-0" />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>No station found.</CommandEmpty>
            <CommandGroup>
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
                    className="flex items-center justify-between py-3 rounded-lg mx-1"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <Check
                        className={cn(
                          "size-4 shrink-0 text-primary",
                          value === station.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className={cn("truncate text-[15px]", station.disabled && "opacity-40 line-through")}>
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
      </PopoverContent>
    </Popover>
  );
}
