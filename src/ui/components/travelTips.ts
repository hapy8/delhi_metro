import { el } from '../../utils/dom';

export function renderTravelTips(container: HTMLElement) {
  const tipsBox = el('div', 'tips-box');
  tipsBox.appendChild(el('div', 'tips-title', '\ud83d\udca1 Travel Tips'));
  
  const tipsText = el('div', 'tips-text');
  const tips = [
    '\u2022 Allow 5\u20138 extra minutes at interchange stations',
    '\u2022 Peak hours: 8\u201310 AM and 5\u20138 PM may have longer waits',
    '\u2022 Token / Smart card valid on all DMRC lines',
    '\u2022 Board the correct direction \u2014 check the terminus sign on the platform'
  ];
  
  tips.forEach((tip, i) => {
    tipsText.appendChild(document.createTextNode(tip));
    if (i < tips.length - 1) {
      tipsText.appendChild(document.createElement('br'));
    }
  });
  
  tipsBox.appendChild(tipsText);
  container.appendChild(tipsBox);
}
