export function setupOfflineDetection() {
  const badge = document.getElementById('offline-badge');
  if (!badge) return;

  window.addEventListener('online', () => {
    badge.style.display = 'none';
  });
  
  window.addEventListener('offline', () => {
    badge.style.display = '';
  });
  
  if (!navigator.onLine) {
    badge.style.display = '';
  }
}
