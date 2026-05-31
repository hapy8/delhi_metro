export function renderHeader(container: HTMLElement) {
  container.innerHTML = '';
  
  // Create SVG manually for safety/DOM API (no innerHTML)
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '28');
  svg.setAttribute('height', '28');
  svg.setAttribute('viewBox', '0 0 28 28');
  svg.setAttribute('fill', 'none');

  const rect1 = document.createElementNS(svgNS, 'rect');
  rect1.setAttribute('width', '28');
  rect1.setAttribute('height', '28');
  rect1.setAttribute('rx', '6');
  rect1.setAttribute('fill', '#1a1a2e');
  
  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', 'M5 20V11l9-7 9 7v9');
  path.setAttribute('stroke', '#F4A261');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  const rect2 = document.createElementNS(svgNS, 'rect');
  rect2.setAttribute('x', '10');
  rect2.setAttribute('y', '14');
  rect2.setAttribute('width', '8');
  rect2.setAttribute('height', '6');
  rect2.setAttribute('rx', '1');
  rect2.setAttribute('stroke', '#e2e8f0');
  rect2.setAttribute('stroke-width', '1.5');

  const c1 = document.createElementNS(svgNS, 'circle');
  c1.setAttribute('cx', '11.5');
  c1.setAttribute('cy', '21');
  c1.setAttribute('r', '1');
  c1.setAttribute('fill', '#F4A261');

  const c2 = document.createElementNS(svgNS, 'circle');
  c2.setAttribute('cx', '16.5');
  c2.setAttribute('cy', '21');
  c2.setAttribute('r', '1');
  c2.setAttribute('fill', '#F4A261');

  svg.appendChild(rect1);
  svg.appendChild(path);
  svg.appendChild(rect2);
  svg.appendChild(c1);
  svg.appendChild(c2);

  container.appendChild(svg);

  const titleDiv = document.createElement('div');
  const hTitle = document.createElement('div');
  hTitle.className = 'hdr-title';
  hTitle.textContent = 'Delhi Metro';
  const hSub = document.createElement('div');
  hSub.className = 'hdr-sub';
  hSub.textContent = 'Route Navigator';
  titleDiv.appendChild(hTitle);
  titleDiv.appendChild(hSub);
  container.appendChild(titleDiv);

  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.id = 'offline-badge';
  badge.style.display = 'none';
  badge.textContent = '✈ OFFLINE';
  container.appendChild(badge);
}
