import { useState, useRef, useCallback, useEffect } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_STATIONS, getStationLineNames } from "@/core/data/stations";
import { LINES } from "@/core/data/lines";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StationSearchProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  excludeStation?: string;
  /** "from" renders a circle origin icon, "to" renders a pin icon */
  variant?: "from" | "to";
}

/**
 * Fuzzy-search autocomplete for Delhi Metro stations.
 * Fully accessible: keyboard navigation, aria attributes, blur-to-close.
 */
export function StationSearch({
  id,
  label,
  placeholder,
  value,
  onChange,
  excludeStation,
  variant = "from",
}: StationSearchProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external value → internal query
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      setHighlightedIndex(-1);

      if (!searchQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        onChange("");
        return;
      }

      const filtered = excludeStation
        ? ALL_STATIONS.filter((s) => s !== excludeStation)
        : ALL_STATIONS;

      const matches = fuzzySearch(searchQuery, filtered, 10);
      setResults(matches);
      setIsOpen(matches.length > 0);
    },
    [excludeStation, onChange]
  );

  const selectStation = useCallback(
    (station: string) => {
      setQuery(station);
      onChange(station);
      setIsOpen(false);
      setResults([]);
      setHighlightedIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((i) => Math.max(i - 1, -1));
          break;
        case "Enter":
          if (highlightedIndex >= 0 && results[highlightedIndex]) {
            e.preventDefault();
            selectStation(results[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, results, highlightedIndex, selectStation]
  );

  // Close on outside click
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const Icon = variant === "from" ? Navigation : MapPin;
  const isValid = ALL_STATIONS.includes(query);

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        <Icon
          className="size-3"
          style={{
            color: variant === "from"
              ? "oklch(0.68 0.25 50)"
              : "oklch(0.55 0.25 258)",
          }}
        />
        {label}
      </label>

      {/* Input wrapper */}
      <div
        className={cn(
          "relative flex items-center rounded-xl border transition-all duration-200",
          "bg-secondary/50",
          isFocused
            ? "border-ring ring-3 ring-ring/20 bg-card"
            : isValid
              ? "border-emerald-500/30 bg-card"
              : "border-border hover:border-border/80"
        )}
      >
        {/* Search icon */}
        <Search
          className="absolute left-3 size-4 text-muted-foreground pointer-events-none"
        />

        <input
          id={id}
          ref={inputRef}
          type="text"
          role="combobox"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          aria-activedescendant={
            highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined
          }
          value={query}
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (query && results.length === 0) handleSearch(query);
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full bg-transparent pl-9 pr-3 py-3 text-sm",
            "placeholder:text-muted-foreground/60",
            "focus:outline-none",
            "text-foreground"
          )}
        />

        {/* Valid indicator */}
        {isValid && query && (
          <span className="absolute right-3 size-2 rounded-full bg-emerald-400 shrink-0" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 z-50 mt-1.5",
            "rounded-xl border border-border bg-popover shadow-xl",
            "animate-scale-in"
          )}
        >
          <ScrollArea className="max-h-[220px]">
            <ul
              id={`${id}-listbox`}
              role="listbox"
              aria-label={`${label} options`}
              className="p-1"
            >
              {results.map((station, index) => {
                const lines = getStationLineNames(station);
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={station}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={isHighlighted}
                    onPointerDown={(e) => {
                      // pointerdown fires before blur, preventing dropdown close
                      e.preventDefault();
                      selectStation(station);
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer",
                      "text-sm transition-colors duration-100 select-none",
                      isHighlighted
                        ? "bg-accent/10 text-foreground"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="font-medium truncate">{station}</span>
                    {lines.length > 0 && (
                      <div className="flex items-center gap-1 ml-2 shrink-0">
                        {lines.slice(0, 3).map((lineName) => {
                          const lineKey = Object.entries(LINES).find(
                            ([, v]) => v.name === lineName
                          )?.[0];
                          const color = lineKey
                            ? LINES[lineKey]?.color
                            : "#6b7280";
                          return (
                            <span
                              key={lineName}
                              className="line-dot"
                              style={{ background: color }}
                              title={lineName}
                            />
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

// ─── Fuzzy Search ─────────────────────────────────────────────────────────────

function fuzzySearch(
  query: string,
  items: string[],
  maxResults: number
): string[] {
  const q = query.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!q) return items.slice(0, maxResults);

  const maxErrors =
    q.length <= 2 ? 0 : q.length <= 4 ? 1 : q.length <= 7 ? 2 : 3;
  const scored: { item: string; score: number }[] = [];

  for (const item of items) {
    const t = item.toLowerCase().replace(/[^a-z0-9]/g, "");

    if (t.startsWith(q)) { scored.push({ item, score: -1 }); continue; }
    if (t.includes(q))   { scored.push({ item, score: 0 });  continue; }

    // Subsequence check
    let qIdx = 0;
    for (let i = 0; i < t.length; i++) {
      if (t[i] === q[qIdx]) {
        qIdx++;
        if (qIdx === q.length) break;
      }
    }
    if (qIdx === q.length) { scored.push({ item, score: 0.5 }); continue; }

    // Edit distance
    const dp = Array.from({ length: q.length + 1 }, (_, i) =>
      Array.from({ length: t.length + 1 }, (_, j) => (i === 0 ? j : i))
    );
    for (let i = 1; i <= q.length; i++) {
      for (let j = 1; j <= t.length; j++) {
        const cost = q[i - 1] === t[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    const minCost = Math.min(...dp[q.length]);
    if (minCost <= maxErrors) scored.push({ item, score: minCost });
  }

  return scored
    .sort((a, b) => a.score - b.score || a.item.length - b.item.length)
    .slice(0, maxResults)
    .map((r) => r.item);
}
