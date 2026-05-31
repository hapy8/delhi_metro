import type { PathNode, RouteScore } from './types';

export function score(path: PathNode[]): RouteScore {
  let ic = 0;
  for (let i = 0; i < path.length - 1; i++) {
    if (path[i].l && path[i + 1].l && path[i].l !== path[i + 1].l && path[i + 1].l !== 'WALK') {
      ic++;
    }
  }
  const t = (path.length - 1) * 3 + ic * 5;
  return { ic, stns: path.length, t };
}

export interface Segment {
  line: string;
  stns: string[];
}

export function getSegments(path: PathNode[]): Segment[] {
  const segs: Segment[] = [];
  let cl: string | null = null;
  let cs: string[] = [];
  
  for (const step of path) {
    const l: string | null = step.l || cl;
    if (l !== cl && cs.length && cl !== null) {
      segs.push({ line: cl, stns: cs });
      cs = [];
    }
    cl = l;
    cs.push(step.s);
  }
  if (cs.length && cl !== null) {
    segs.push({ line: cl, stns: cs });
  }
  return segs;
}
