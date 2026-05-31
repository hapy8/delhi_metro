export function setupPWA() {
  const isStandalone = window.matchMedia('(display-mode:standalone)').matches
    || (navigator as any).standalone === true;
    
  let deferredPrompt: any = null;
  const banner = document.getElementById('install-banner');
  const btn = document.getElementById('install-btn');
  const iosSteps = document.getElementById('ios-steps');

  if (!banner || !btn || !iosSteps) return;

  function markInstalled() {
    btn!.textContent = '✅ Installed';
    btn!.classList.add('installed');
    (btn as HTMLButtonElement).disabled = true;
    iosSteps!.classList.remove('show');
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    banner!.classList.remove('hidden');
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    markInstalled();
  });

  btn.addEventListener('click', () => {
    if (isStandalone) {
      markInstalled();
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((result: any) => {
        if (result.outcome === 'accepted') markInstalled();
        deferredPrompt = null;
      });
      return;
    }

    iosSteps!.classList.toggle('show');
  });

  if (isStandalone) {
    banner.classList.add('hidden');
  } else {
    banner.classList.remove('hidden');
  }
}
