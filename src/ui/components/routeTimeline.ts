import { el } from '../../utils/dom';
import { LINES } from '../../core/data/lines';
import { getPlatform } from '../../core/platforms';
import { terminus } from '../../core/graph';
import type { PathNode } from '../../core/types';

export function renderRouteTimeline(container: HTMLElement, path: PathNode[]) {
  const routeCard = el('div', 'route-card');
  routeCard.appendChild(el('div', 'route-title', 'Step-by-Step Route'));

  path.forEach((step, idx) => {
    const isLast = idx === path.length - 1;
    const nextStep = !isLast ? path[idx + 1] : null;
    const isIC = step.l && nextStep && nextStep.l && nextStep.l !== step.l;
    const isSource = idx === 0;

    const ld = step.l ? LINES[step.l] : null;
    const nextLd = nextStep && nextStep.l ? LINES[nextStep.l] : null;

    const dotColor = ld ? ld.color : 'var(--color-text-main)';
    const barColor = ((isSource || isIC) && nextLd) ? nextLd.color : (ld ? ld.color : 'var(--color-border)');

    const srow = el('div', 'srow');

    // Timeline column
    const stl = el('div', 'stl');
    const sdot = el('div', 'sdot');
    sdot.style.cssText = 'background:' + dotColor + ';border:3px solid ' + dotColor +
      (isIC ? ';outline:3px solid #fff8ee;box-shadow:0 0 0 2px #F4A261' : '');
    stl.appendChild(sdot);
    if (!isLast) {
      const sbar = el('div', 'sbar');
      sbar.style.background = barColor;
      stl.appendChild(sbar);
    }
    srow.appendChild(stl);

    // Info column
    const sinfo = el('div', 'sinfo' + (isLast ? ' last' : ''));

    if (isIC && nextLd) {
      sinfo.appendChild(el('div', 'ic-tag', 'INTERCHANGE \u2192 ' + nextLd.name));
    }

    sinfo.appendChild(el('div', 'sname' + ((isSource || isLast) ? ' bold' : ''), step.s));

    if (ld) {
      const sline = el('div', 'sline');
      sline.style.color = ld.color;
      const lineDot = el('span', 'dot');
      lineDot.style.background = ld.color;
      sline.appendChild(lineDot);
      sline.appendChild(document.createTextNode(ld.name));
      sinfo.appendChild(sline);
    }

    // Board instruction
    const boardLine = isSource ? (nextStep && nextStep.l) : (isIC ? nextStep.l : null);
    if (boardLine && nextStep) {
      const t = terminus(boardLine, step.s, nextStep.s);
      const bld = LINES[boardLine];
      if (bld && t) {
        const platform = getPlatform(boardLine, step.s, nextStep.s);
        const pText = platform !== null ? `Platform ${platform} • ` : '';
        const bbox = el('div', 'board-box');
        bbox.style.cssText = 'background:' + bld.color + '15;border:1px solid ' + bld.color + '40;margin-top:5px';
        const s1 = el('span', null, '\ud83d\ude87 ');
        const s2 = el('span');
        s2.style.cssText = 'color:' + bld.color + ';font-weight:700;font-size:12px';
        s2.textContent = pText + 'Board ' + bld.name;
        const s3 = el('span');
        s3.style.cssText = 'color:var(--color-text-light);font-size:11px';
        s3.textContent = '\u2192 towards';
        const s4 = el('span');
        s4.style.cssText = 'color:var(--color-text-main);font-weight:700;font-size:12px;margin-left:4px;';
        s4.textContent = t;
        bbox.appendChild(s1);
        bbox.appendChild(s2);
        bbox.appendChild(s3);
        bbox.appendChild(s4);
        sinfo.appendChild(bbox);
      }
    }

    srow.appendChild(sinfo);
    routeCard.appendChild(srow);
  });

  container.appendChild(routeCard);
}
