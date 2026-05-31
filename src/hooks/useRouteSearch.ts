import { useState, useCallback } from "react";
import { djFast, djLeast } from "@/core/pathfinding";
import { score } from "@/core/scoring";
import { ALL_STATIONS } from "@/core/data/stations";
import type { AllRoutes } from "@/core/types";

export type SearchError =
  | "EMPTY"
  | "INVALID_FROM"
  | "INVALID_TO"
  | "SAME_STATION"
  | "NO_ROUTE";

export interface SearchState {
  routes: AllRoutes | null;
  activeKey: "fastest" | "least";
  error: SearchError | null;
  isSearched: boolean;
}

export interface UseRouteSearchReturn extends SearchState {
  fromStation: string;
  toStation: string;
  setFromStation: (s: string) => void;
  setToStation: (s: string) => void;
  search: () => void;
  swap: () => void;
  setActiveKey: (k: "fastest" | "least") => void;
  clearError: () => void;
}

/**
 * Hook encapsulating all route-search state and logic.
 * Components stay pure — they only call setters and read state.
 */
export function useRouteSearch(): UseRouteSearchReturn {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [state, setState] = useState<SearchState>({
    routes: null,
    activeKey: "fastest",
    error: null,
    isSearched: false,
  });

  const search = useCallback(() => {
    const from = fromStation.trim();
    const to = toStation.trim();

    // Validate inputs
    if (!from || !to) {
      setState((s) => ({ ...s, error: "EMPTY", routes: null, isSearched: true }));
      return;
    }
    if (!ALL_STATIONS.includes(from)) {
      setState((s) => ({ ...s, error: "INVALID_FROM", routes: null, isSearched: true }));
      return;
    }
    if (!ALL_STATIONS.includes(to)) {
      setState((s) => ({ ...s, error: "INVALID_TO", routes: null, isSearched: true }));
      return;
    }
    if (from === to) {
      setState((s) => ({ ...s, error: "SAME_STATION", routes: null, isSearched: true }));
      return;
    }

    const fastPath = djFast(from, to);
    const leastPath = djLeast(from, to);

    if (!fastPath) {
      setState((s) => ({ ...s, error: "NO_ROUTE", routes: null, isSearched: true }));
      return;
    }

    const fastScore = score(fastPath);
    const leastScore = score(leastPath ?? fastPath);
    const same =
      fastScore.ic === leastScore.ic && fastScore.t === leastScore.t;

    const routes: AllRoutes = {
      fast:  { path: fastPath,           ...fastScore },
      least: { path: leastPath ?? fastPath, ...leastScore },
      same,
    };

    setState({
      routes,
      activeKey: same ? "fastest" : "fastest",
      error: null,
      isSearched: true,
    });
  }, [fromStation, toStation]);

  const swap = useCallback(() => {
    setFromStation(toStation);
    setToStation(fromStation);
    setState((s) => ({ ...s, routes: null, error: null, isSearched: false }));
  }, [fromStation, toStation]);

  const setActiveKey = useCallback((k: "fastest" | "least") => {
    setState((s) => ({ ...s, activeKey: k }));
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    fromStation,
    toStation,
    setFromStation,
    setToStation,
    search,
    swap,
    setActiveKey,
    clearError,
    ...state,
  };
}
