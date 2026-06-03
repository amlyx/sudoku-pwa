const CACHE = 'sudoku-v4';
self.addEventListener('install', e => {
  // Force activation — kill all old caches immediately
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  // Network-first strategy — no stale cache interference
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
