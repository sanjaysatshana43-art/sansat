// AGGRESSIVE CACHE BUSTING - Forces update on every visit
// Change this version number OR the timestamp to force cache clear
const CACHE_VERSION = 'v22';
const BUILD_TIMESTAMP = '2026011609'; // YYYYMMDDHH format - update this to force refresh
const CACHE_NAME = `sansat-cache-${CACHE_VERSION}-${BUILD_TIMESTAMP}`;

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/social-preview.jpg',
  '/red_pomegranate.webp',
  '/dark_red_thai_wax_apple.webp',
  '/pom_large.webp',
  '/jambu_large.webp',
  '/jambu_medium.webp',
  '/jambu_sweet.webp',
  '/farming_wax_apple.webp',
  '/process_harvest.webp',
  '/process_pack.webp',
  '/process_deliver.webp',
  '/process_pay.webp',
  '/jambu_combo_variety.webp',
  '/jambu_promise.webp',
  '/SanSatLogo.webp'
];

// INSTALL: Force immediate activation of new service worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing new version:', CACHE_NAME);
  // CRITICAL: Skip waiting to activate immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ACTIVATE: Delete ALL old caches and take control immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new version:', CACHE_NAME);

  event.waitUntil(
    Promise.all([
      // Take control of all pages immediately
      clients.claim(),
      // Delete ALL old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ]).then(() => {
      // Notify all clients to refresh
      return clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_UPDATED', version: CACHE_NAME });
        });
      });
    })
  );
});

// FETCH: Network-first for EVERYTHING to ensure fresh content
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and cross-origin requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const url = new URL(event.request.url);

  // ALWAYS use network-first for HTML and assets (JS/CSS)
  const isHTML = event.request.mode === 'navigate' ||
    event.request.destination === 'document' ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html');
  const isAsset = url.pathname.match(/\.(js|css|json)$/) ||
    event.request.destination === 'script' ||
    event.request.destination === 'style';

  if (isHTML || isAsset) {
    // NETWORK FIRST - Always fetch fresh, fallback to cache only when offline
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          console.log('[SW] Offline - serving cached:', event.request.url);
          return caches.match(event.request);
        })
    );
  } else {
    // Stale-while-revalidate for images - serve cache but update in background
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        // Return cached immediately, update in background
        return cachedResponse || fetchPromise;
      })
    );
  }
});

// MESSAGE: Handle skip waiting and cache clear requests
self.addEventListener('message', (event) => {
  if (event.data) {
    if (event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    if (event.data.type === 'CLEAR_ALL_CACHES') {
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0]?.postMessage({ cleared: true });
      });
    }
    if (event.data.type === 'GET_VERSION') {
      event.ports[0]?.postMessage({ version: CACHE_NAME });
    }
  }
});
