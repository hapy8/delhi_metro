import { el } from '../../utils/dom';

export interface SearchCardProps {
  onSwap: () => void;
  onSearch: () => void;
  onPrefChange: (pref: 'fastest' | 'least') => void;
}

export function renderSearchCard(container: HTMLElement, props: SearchCardProps) {
  const card = el('div', 's-card');

  // Preference
  const prefWrapper = el('div');
  prefWrapper.style.marginBottom = '14px';
  prefWrapper.appendChild(el('div', 'flabel', 'Route Preference'));
  
  const prefTabs = el('div', 'pref-tabs');
  const btnFast = el('button', 'pref-tab on');
  btnFast.id = 'pref-fastest';
  
  const spanFast = el('span', 'ti', '⚡');
  btnFast.appendChild(spanFast);
  btnFast.appendChild(document.createTextNode('Fastest Route'));
  
  const btnLeast = el('button', 'pref-tab');
  btnLeast.id = 'pref-least';
  const spanLeast = el('span', 'ti', '🔄');
  btnLeast.appendChild(spanLeast);
  btnLeast.appendChild(document.createTextNode('Least Interchanges'));

  btnFast.addEventListener('click', () => {
    btnFast.classList.add('on');
    btnLeast.classList.remove('on');
    props.onPrefChange('fastest');
  });

  btnLeast.addEventListener('click', () => {
    btnLeast.classList.add('on');
    btnFast.classList.remove('on');
    props.onPrefChange('least');
  });

  prefTabs.appendChild(btnFast);
  prefTabs.appendChild(btnLeast);
  prefWrapper.appendChild(prefTabs);
  card.appendChild(prefWrapper);

  // From
  const fromWrapper = el('div');
  fromWrapper.style.marginBottom = '8px';
  fromWrapper.appendChild(el('label', 'flabel', 'From Station'));
  
  const fromRel = el('div');
  fromRel.style.position = 'relative';
  
  const fromInp = el('input', 'finput');
  fromInp.id = 'from-inp';
  fromInp.placeholder = 'Search source station…';
  fromInp.autocomplete = 'off';
  fromInp.setAttribute('autocorrect', 'off');
  fromInp.spellcheck = false;
  fromRel.appendChild(fromInp);

  const fromDd = el('div', 'dd');
  fromDd.id = 'from-dd';
  fromRel.appendChild(fromDd);
  fromWrapper.appendChild(fromRel);
  card.appendChild(fromWrapper);

  // Swap
  const swapRow = el('div', 'swap-row');
  const swapBtn = el('button', 'swap-btn', '⇅');
  swapBtn.addEventListener('click', props.onSwap);
  swapRow.appendChild(swapBtn);
  card.appendChild(swapRow);

  // To
  const toWrapper = el('div');
  toWrapper.style.marginBottom = '16px';
  toWrapper.appendChild(el('label', 'flabel', 'To Station'));
  
  const toRel = el('div');
  toRel.style.position = 'relative';
  
  const toInp = el('input', 'finput');
  toInp.id = 'to-inp';
  toInp.placeholder = 'Search destination station…';
  toInp.autocomplete = 'off';
  toInp.setAttribute('autocorrect', 'off');
  toInp.spellcheck = false;
  toRel.appendChild(toInp);

  const toDd = el('div', 'dd');
  toDd.id = 'to-dd';
  toRel.appendChild(toDd);
  toWrapper.appendChild(toRel);
  card.appendChild(toWrapper);

  // Find Route
  const goBtn = el('button', 'go-btn', '🔍 Find Route');
  goBtn.addEventListener('click', props.onSearch);
  card.appendChild(goBtn);

  // Error box
  const errBox = el('div', 'err');
  errBox.id = 'err-box';
  card.appendChild(errBox);

  container.appendChild(card);
}
