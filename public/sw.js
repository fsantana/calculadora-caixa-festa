const CACHE_VERSION = 'v2'; // atualize quando publicar nova versão
const CACHE_NAME = `calculadora-${CACHE_VERSION}`;
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/public/script.js', // ajuste o caminho se necessário
  '/favicon.ico'
];

// Instalação do service worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Network-first for navigations (index.html)
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return resp;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // For other requests: cache-first then network fallback, and update cache in background
  event.respondWith(
    caches.match(req).then(cached => {
      const networkFetch = fetch(req).then(response => {
        if (response && response.status === 200) {
          caches.open(CACHE_NAME).then(cache => cache.put(req, response.clone()));
        }
        return response;
      }).catch(() => null);
      return cached || networkFetch;
    })
  );
});

// Ativação do service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

// allow client to tell SW to skipWaiting
self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
