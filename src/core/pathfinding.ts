import { G } from './graph';
import type { PathNode } from './types';

export function djFast(start: string, end: string): PathNode[] | null {
  if (start === end) return [{ s: start, l: null }];
  
  // pq: [cost, time, current, arrived_line, path]
  const pq: [number, number, string, string | null, PathNode[]][] = [[0, 0, start, null, [{ s: start, l: null }]]];
  const vis = new Map<string, number>();
  
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const [cost, st, cur, arr, path] = pq.shift()!;
    
    const k = cur + '|' + (arr || '');
    if (vis.has(k) && vis.get(k)! <= cost) continue;
    vis.set(k, cost);
    
    if (cur === end) return path;
    
    for (const { s, l } of (G[cur] || [])) {
      const ic = arr && l !== arr && l !== 'WALK' ? 5 : 0;
      const nextK = s + '|' + l;
      if (!vis.has(nextK)) {
        pq.push([cost + 3 + ic, st + 1, s, l, [...path, { s, l }]]);
      }
    }
  }
  return null;
}

export function djLeast(start: string, end: string): PathNode[] | null {
  if (start === end) return [{ s: start, l: null }];
  
  // pq: [ic_count, time, current, arrived_line, path]
  const pq: [number, number, string, string | null, PathNode[]][] = [[0, 0, start, null, [{ s: start, l: null }]]];
  const vis = new Map<string, number>();
  
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const [ic, st, cur, arr, path] = pq.shift()!;
    
    const k = cur + '|' + (arr || '');
    if (vis.has(k) && vis.get(k)! <= ic) continue;
    vis.set(k, ic);
    
    if (cur === end) return path;
    
    for (const { s, l } of (G[cur] || [])) {
      const nic = ic + (arr && l !== arr && l !== 'WALK' ? 1 : 0);
      const nextK = s + '|' + l;
      if (!vis.has(nextK)) {
        pq.push([nic, st + 1, s, l, [...path, { s, l }]]);
      }
    }
  }
  return null;
}
