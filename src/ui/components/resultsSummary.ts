import { el } from '../../utils/dom';

export function renderResultsSummary(
  container: HTMLElement,
  fast: { t: number, stns: number, ic: number },
  least: { t: number, stns: number, ic: number },
  same: boolean,
  activeKey: 'fastest' | 'least',
  setActive: (k: 'fastest' | 'least') => void
) {
  const active = activeKey === 'fastest' ? fast : least;
  
  if (!same) {
    const tdiff = fast.t - least.t;
    const icdiff = fast.ic - least.ic;
    const tabs = el('div', 'rtabs');

    // Fastest tab
    const ftab = el('div', 'rtab' + (activeKey === 'fastest' ? ' on' : ''));
    ftab.addEventListener('click', () => setActive('fastest'));
    ftab.appendChild(el('div', 'rtab-lbl', '⚡ Fastest'));
    ftab.appendChild(el('div', 'rtab-val', fast.t + ' min'));
    const fstats = el('div', 'rtab-stats');
    fstats.appendChild(el('span', 'rtag', fast.stns + ' stn'));
    fstats.appendChild(el('span', 'rtag', fast.ic + ' change' + (fast.ic !== 1 ? 's' : '')));
    ftab.appendChild(fstats);
    if (tdiff < 0) {
      ftab.appendChild(el('div', 'best-tag', '\u23f1 ' + Math.abs(tdiff) + ' min faster'));
    }
    tabs.appendChild(ftab);

    // Least tab
    const ltab = el('div', 'rtab' + (activeKey === 'least' ? ' on' : ''));
    ltab.addEventListener('click', () => setActive('least'));
    ltab.appendChild(el('div', 'rtab-lbl', '🔄 Fewer Changes'));
    ltab.appendChild(el('div', 'rtab-val', least.ic + ' interchange' + (least.ic !== 1 ? 's' : '')));
    const lstats = el('div', 'rtab-stats');
    lstats.appendChild(el('span', 'rtag', least.stns + ' stn'));
    lstats.appendChild(el('span', 'rtag', least.t + ' min'));
    ltab.appendChild(lstats);
    if (icdiff > 0) {
      ltab.appendChild(el('div', 'best-tag', '🔄 ' + icdiff + ' fewer change' + (icdiff !== 1 ? 's' : '')));
    }
    tabs.appendChild(ltab);

    container.appendChild(tabs);
  }

  // Summary grid
  const sumGrid = el('div', 'sum-grid');
  const stats = [
    { ic: '\ud83d\ude87', v: active.stns, l: 'Stations' },
    { ic: '\u23f1', v: active.t + ' min', l: 'Est. Time' },
    { ic: '\ud83d\udd04', v: active.ic, l: 'Interchanges' }
  ];
  
  stats.forEach(item => {
    const c = el('div', 'sum-c');
    c.appendChild(el('div', 'sum-ic', item.ic));
    c.appendChild(el('div', 'sum-v', String(item.v)));
    c.appendChild(el('div', 'sum-l', item.l));
    sumGrid.appendChild(c);
  });
  container.appendChild(sumGrid);
}
