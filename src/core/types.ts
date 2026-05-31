export interface Station {
  id: string; // The name is used as the ID in this graph
}

export interface LineData {
  name: string;
  color: string;
}

export interface Step {
  s: string; // Station
  l: string | null; // Line code
}

export interface PathNode extends Step {}

export interface RouteScore {
  ic: number; // Interchanges
  stns: number; // Stations count
  t: number; // Estimated time
}

export interface RouteResult extends RouteScore {
  path: PathNode[];
}

export interface AllRoutes {
  fast: RouteResult;
  least: RouteResult;
  same: boolean;
}
