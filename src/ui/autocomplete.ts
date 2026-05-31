import { el } from '../utils/dom';
import { getStationLineNames } from '../core/data/stations';

export class Autocomplete {
  private dd: HTMLElement;
  private inp: HTMLInputElement;
  private items: string[];
  private onSelect: (val: string) => void;
  private excludeGet: () => string;

  constructor(
    inputId: string,
    ddId: string,
    items: string[],
    excludeGet: () => string,
    onSelect: (val: string) => void
  ) {
    this.inp = document.getElementById(inputId) as HTMLInputElement;
    this.dd = document.getElementById(ddId) as HTMLElement;
    this.items = items;
    this.excludeGet = excludeGet;
    this.onSelect = onSelect;

    this.inp.addEventListener('input', () => this.handleInput());
    this.inp.addEventListener('focus', () => this.handleInput());
    this.inp.addEventListener('blur', () => {
      setTimeout(() => this.hide(), 200);
    });
  }

  private handleInput() {
    const v = this.inp.value.trim();
    const ex = this.excludeGet();

    if (!v) {
      this.hide();
      return;
    }

    const res = this.fuzzySearch(v, this.items.filter(s => s !== ex), 8);
    this.show(res);
  }

  private fuzzySearch(query: string, items: string[], maxResults: number): string[] {
    const q = query.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!q) return items.slice(0, maxResults);

    const maxErrors = q.length <= 2 ? 0 : (q.length <= 4 ? 1 : (q.length <= 7 ? 2 : 3));
    const results: { item: string; score: number }[] = [];

    for (const item of items) {
      const t = item.toLowerCase().replace(/[^a-z0-9]/g, '');

      if (t.startsWith(q)) {
        results.push({ item, score: -1 });
        continue;
      }
      if (t.includes(q)) {
        results.push({ item, score: 0 });
        continue;
      }

      let qIdx = 0;
      for (let i = 0; i < t.length; i++) {
        if (t[i] === q[qIdx]) {
          qIdx++;
          if (qIdx === q.length) break;
        }
      }
      if (qIdx === q.length) {
        results.push({ item, score: 0.5 });
        continue;
      }

      const dp: number[][] = Array(q.length + 1).fill(0).map(() => Array(t.length + 1).fill(0));
      for (let i = 0; i <= q.length; i++) dp[i][0] = i;

      for (let i = 1; i <= q.length; i++) {
        for (let j = 1; j <= t.length; j++) {
          const cost = q[i - 1] === t[j - 1] ? 0 : 1;
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1,
            dp[i - 1][j - 1] + cost
          );
        }
      }

      let minCost = q.length;
      for (let j = 0; j <= t.length; j++) {
        if (dp[q.length][j] < minCost) minCost = dp[q.length][j];
      }

      if (minCost <= maxErrors) {
        results.push({ item, score: minCost });
      }
    }

    results.sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score;
      return a.item.length - b.item.length;
    });

    return results.slice(0, maxResults).map(r => r.item);
  }

  private show(matches: string[]) {
    this.dd.replaceChildren();
    if (!matches.length) {
      const div = el('div', 'ddi', 'No stations found');
      div.style.color = 'var(--color-text-muted)';
      div.style.fontStyle = 'italic';
      div.style.cursor = 'default';
      this.dd.appendChild(div);
      this.dd.classList.add('show');
      return;
    }

    matches.forEach(s => {
      const div = el('div', 'ddi');
      
      const snameSpan = el('span', '', s);
      div.appendChild(snameSpan);
      
      const lines = getStationLineNames(s);
      if (lines.length > 0) {
        const lineText = ` (${lines.join(', ')})`;
        const slineSpan = el('span', '', lineText);
        slineSpan.style.color = 'var(--color-text-muted)';
        slineSpan.style.fontSize = '12px';
        slineSpan.style.textAlign = 'right';
        div.appendChild(slineSpan);
      }

      div.addEventListener('mousedown', () => {
        this.inp.value = s;
        this.hide();
        this.onSelect(s);
      });
      this.dd.appendChild(div);
    });

    this.dd.classList.add('show');
  }

  private hide() {
    this.dd.classList.remove('show');
  }
}
