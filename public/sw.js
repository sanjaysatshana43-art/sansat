const CACHE_NAME = 'sansat-cache-v21';
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

self.addEventListener('install', (event) => {
  // Force new service worker to activate immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Take control of all pages immediately
  event.waitUntil(
    Promise.all([
      clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const url = new URL(event.request.url);
  const isAsset = url.pathname.match(/\.(js|css|json)$/) || event.request.destination === 'script' || event.request.destination === 'style';
  const isHTML = event.request.mode === 'navigate' || event.request.destination === 'document';

  // NETWORK FIRST for HTML and JS/CSS (ensures updates are always fetched)
  if (isHTML || isAsset) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Update cache with new version
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Offline? Serve cached version
          return caches.match(event.request);
        })
    );
  } else {
    // CACHE FIRST for images (faster, less critical for updates)
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((fetchResponse) => {
          // Cache new assets dynamically
          if (fetchResponse && fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        });
      })
    );
  }
});

// Handle offline message
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
