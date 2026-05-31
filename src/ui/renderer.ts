import { el } from '../utils/dom';
import { LINES } from '../core/data/lines';
import { getSegments } from '../core/scoring';
import { renderResultsSummary } from './components/resultsSummary';
import { renderRouteTimeline } from './components/routeTimeline';
import { renderTravelTips } from './components/travelTips';
import type { AllRoutes } from '../core/types';

export class Renderer {
  private container: HTMLElement;
  private routes: AllRoutes | null = null;
  private activeKey: 'fastest' | 'least' = 'fastest';

  constructor(containerId: string) {
    this.container = document.getElementById(containerId) as HTMLElement;
  }

  setRoutes(r: AllRoutes) {
    this.routes = r;
    this.activeKey = r.same ? 'fastest' : 'fastest';
    this.render();
  }

  setActive(k: 'fastest' | 'least') {
    if (!this.routes) return;
    this.activeKey = k;
    this.render();
  }

  clear() {
    this.routes = null;
    this.container.replaceChildren();
  }

  private render() {
    if (!this.routes) return;
    
    this.container.replaceChildren();
    
    const active = this.routes[this.activeKey === 'fastest' ? 'fast' : 'least'];
    const segs = getSegments(active.path);

    // 1. Summary and Tabs
    renderResultsSummary(
      this.container,
      this.routes.fast,
      this.routes.least,
      this.routes.same,
      this.activeKey,
      (k) => this.setActive(k)
    );

    // 2. Lines used
    const linesBox = el('div', 'lines-box');
    linesBox.appendChild(el('div', 'lines-lbl', 'Lines Used'));
    const pillsDiv = el('div', 'pills');
    
    segs.forEach(seg => {
      const ld = LINES[seg.line] || { color: '#888', name: seg.line };
      const pill = el('div', 'pill');
      pill.style.cssText = 'background:' + ld.color + '22;border:1.5px solid ' + ld.color;
      
      const dotSpan = el('span', 'dot');
      dotSpan.style.background = ld.color;
      pill.appendChild(dotSpan);
      
      const nameSpan = document.createElement('span');
      nameSpan.style.color = ld.color;
      nameSpan.textContent = ld.name;
      pill.appendChild(nameSpan);
      
      const countSpan = document.createElement('span');
      countSpan.style.cssText = 'color:#94a3b8;font-size:11px';
      countSpan.textContent = '(' + seg.stns.length + ')';
      pill.appendChild(countSpan);
      
      pillsDiv.appendChild(pill);
    });
    linesBox.appendChild(pillsDiv);
    this.container.appendChild(linesBox);

    // 3. Timeline
    renderRouteTimeline(this.container, active.path);

    // 4. Tips
    renderTravelTips(this.container);
  }
}
