import './styles/index.css';
import { ALL_STATIONS } from './core/data/stations';
import { djFast, djLeast } from './core/pathfinding';
import { score } from './core/scoring';
import { Autocomplete } from './ui/autocomplete';
import { renderHeader } from './ui/components/header';
import { renderSearchCard } from './ui/components/searchCard';
import { Renderer } from './ui/renderer';
import { setupOfflineDetection } from './services/offline';
import { setupPWA } from './services/pwa';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA
registerSW({ immediate: true });

let fromStn = '';
let toStn = '';
let pref: 'fastest' | 'least' = 'fastest';

function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // 1. Header
  const headerContainer = document.createElement('div');
  headerContainer.className = 'hdr';
  app.appendChild(headerContainer);
  renderHeader(headerContainer);

  // 2. Page Container
  const pageContainer = document.createElement('div');
  pageContainer.className = 'page';
  app.appendChild(pageContainer);

  // 3. Search Card
  const searchContainer = document.createElement('div');
  pageContainer.appendChild(searchContainer);
  
  // 4. Results Container
  const resultsContainer = document.createElement('div');
  resultsContainer.id = 'results';
  pageContainer.appendChild(resultsContainer);

  // 5. Empty State
  const emptyState = document.createElement('div');
  emptyState.className = 'empty';
  emptyState.id = 'empty-state';
  
  const eic = document.createElement('div');
  eic.className = 'empty-ic';
  eic.textContent = '🚇';
  emptyState.appendChild(eic);
  
  const et = document.createElement('div');
  et.className = 'empty-t';
  et.textContent = 'Search any two stations';
  emptyState.appendChild(et);
  
  const es = document.createElement('div');
  es.className = 'empty-s';
  es.textContent = `Covers all ${ALL_STATIONS.length}+ stations across 10 DMRC lines`;
  emptyState.appendChild(es);
  
  pageContainer.appendChild(emptyState);

  // 6. Install Banner (static HTML injected via safe DOM)
  const installBanner = document.createElement('div');
  installBanner.className = 'install-banner hidden';
  installBanner.id = 'install-banner';
  
  const ibIcon = document.createElement('div');
  ibIcon.className = 'ib-icon';
  ibIcon.textContent = '📲';
  installBanner.appendChild(ibIcon);
  
  const ibText = document.createElement('div');
  ibText.className = 'ib-text';
  const ibTitle = document.createElement('div');
  ibTitle.className = 'ib-title';
  ibTitle.textContent = 'Download App';
  const ibSub = document.createElement('div');
  ibSub.className = 'ib-sub';
  ibSub.textContent = 'Add to home screen · Works offline · No app store needed';
  ibText.appendChild(ibTitle);
  ibText.appendChild(ibSub);
  installBanner.appendChild(ibText);
  
  const ibBtn = document.createElement('button');
  ibBtn.className = 'ib-btn';
  ibBtn.id = 'install-btn';
  ibBtn.textContent = 'Download';
  installBanner.appendChild(ibBtn);
  
  pageContainer.appendChild(installBanner);

  // 7. iOS Steps
  const iosSteps = document.createElement('div');
  iosSteps.className = 'ios-steps';
  iosSteps.id = 'ios-steps';
  
  const iosTitle = document.createElement('div');
  iosTitle.className = 'ios-steps-title';
  iosTitle.textContent = '📱 How to install manually (if prompt does not appear)';
  iosSteps.appendChild(iosTitle);
  
  const createStep = (num: string, htmlStr: string) => {
    const step = document.createElement('div');
    step.className = 'ios-step';
    const numDiv = document.createElement('div');
    numDiv.className = 'ios-step-n';
    numDiv.textContent = num;
    step.appendChild(numDiv);
    
    // safe insertion for static content (DOMParser)
    const tDiv = document.createElement('div');
    tDiv.className = 'ios-step-t';
    const doc = new DOMParser().parseFromString(htmlStr, 'text/html');
    Array.from(doc.body.childNodes).forEach(node => tDiv.appendChild(node));
    step.appendChild(tDiv);
    
    return step;
  };
  
  iosSteps.appendChild(createStep('1', 'If using <strong>Android / Chrome</strong>, look for an install icon in the URL bar or menu.'));
  iosSteps.appendChild(createStep('2', 'If using <strong>iOS / Safari</strong>, tap <strong style="color:#F4A261">Share ↑</strong> and select <strong style="color:#F4A261">Add to Home Screen</strong>.'));
  iosSteps.appendChild(createStep('3', 'Once added, the app works 100% offline without internet! 🎉'));
  
  pageContainer.appendChild(iosSteps);

  // Initialize Search Component
  const renderer = new Renderer('results');

  const doSearch = () => {
    const errBox = document.getElementById('err-box');
    if (errBox) errBox.style.display = 'none';
    
    const fi = document.getElementById('from-inp') as HTMLInputElement;
    const ti = document.getElementById('to-inp') as HTMLInputElement;
    
    const from = fromStn || fi.value.trim();
    const to = toStn || ti.value.trim();
    
    const showErr = (msg: string) => {
      if (errBox) {
        errBox.textContent = '⚠️ ' + msg;
        errBox.style.display = 'block';
      }
    };

    if (!from || !to) { showErr('Please select both stations.'); return; }
    if (!ALL_STATIONS.includes(from)) { showErr('Source station not found. Select from the list.'); return; }
    if (!ALL_STATIONS.includes(to)) { showErr('Destination station not found. Select from the list.'); return; }
    if (from === to) { showErr('Source and destination are the same.'); return; }

    const fastPath = djFast(from, to);
    const leastPath = djLeast(from, to);
    
    if (!fastPath) { showErr('No route found between these stations.'); return; }

    const fs = score(fastPath);
    const ls = score(leastPath || fastPath);
    const same = fs.ic === ls.ic && fs.t === ls.t;

    renderer.setRoutes({
      fast: { path: fastPath, ...fs },
      least: { path: leastPath || fastPath, ...ls },
      same
    });
    renderer.setActive(same ? 'fastest' : pref);
    emptyState.style.display = 'none';
  };

  const doSwap = () => {
    const fi = document.getElementById('from-inp') as HTMLInputElement;
    const ti = document.getElementById('to-inp') as HTMLInputElement;
    
    const tmpVal = fi.value;
    fi.value = ti.value;
    ti.value = tmpVal;
    
    const tmpStn = fromStn;
    fromStn = toStn;
    toStn = tmpStn;
    
    renderer.clear();
    emptyState.style.display = 'block';
    const errBox = document.getElementById('err-box');
    if (errBox) errBox.style.display = 'none';
  };

  renderSearchCard(searchContainer, {
    onSwap: doSwap,
    onSearch: doSearch,
    onPrefChange: (p) => pref = p
  });

  // Autocomplete
  new Autocomplete('from-inp', 'from-dd', ALL_STATIONS, () => toStn, (v) => fromStn = v);
  new Autocomplete('to-inp', 'to-dd', ALL_STATIONS, () => fromStn, (v) => toStn = v);

  // Setup services
  setupOfflineDetection();
  setupPWA();
}

document.addEventListener('DOMContentLoaded', initApp);
