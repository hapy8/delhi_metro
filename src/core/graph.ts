import { LS } from './data/stations';
import type { Step } from './types';

export const G: Record<string, Step[]> = {};

function addEdge(a: string, b: string, line: string) {
  if (!G[a]) G[a] = [];
  G[a].push({ s: b, l: line });
  
  if (!G[b]) G[b] = [];
  G[b].push({ s: a, l: line });
}

// Build graph on initialization
for (const [line, stns] of Object.entries(LS)) {
  for (let i = 0; i < stns.length - 1; i++) {
    addEdge(stns[i], stns[i + 1], line);
  }
}

// Add manual walking interchanges (where stations have different names but are connected)
function addWalkingEdge(stn1: string, stn2: string) {
  if (!G[stn1]) G[stn1] = [];
  if (!G[stn2]) G[stn2] = [];
  G[stn1].push({ s: stn2, l: 'WALK' });
  G[stn2].push({ s: stn1, l: 'WALK' });
}

addWalkingEdge("Noida Sector 51", "Noida Sector 52");
addWalkingEdge("Dhaula Kuan", "Durgabai Deshmukh South Campus");

export function terminus(lineKey: string, board: string, next: string): string | null {
  const s = LS[lineKey];
  if (!s) return null;
  const ib = s.indexOf(board);
  const ix = s.indexOf(next);
  if (ib < 0 || ix < 0) return null;
  return ix > ib ? s[s.length - 1] : s[0];
}
