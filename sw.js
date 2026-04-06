/* ═══════════════════════════════════════════════
   IB Prep · Service Worker
   Offline-first caching for plane/no-network study
═══════════════════════════════════════════════ */
// Bump this when deploying changes that must invalidate previously cached assets.
const CACHE_NAME = 'ibprep-v5';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/process_flows.js',
  '/data_scripts.js',
  '/data_scripts_2.js',
  '/data_scripts_3.js',
  '/data_knowledge_2.js',
  '/data_deals.js',
  '/market_map.js',
  '/manifest.json',
];

/* ── Install: pre-cache app shell ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: remove old caches ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch strategy ── */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  /* Local files → cache-first (works fully offline) */
	  if (url.origin === self.location.origin) {
	    e.respondWith(
	      caches.match(e.request).then(cached => {
	        if (cached) return cached;
	        return fetch(e.request).then(res => {
	          // Avoid caching 404/500 etc. Otherwise a missing asset can get "stuck" offline.
	          if (res && res.ok) {
	            const clone = res.clone();
	            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
	          }
	          return res;
	        }).catch(() => caches.match('/index.html')); // fallback to shell
	      })
	    );
	    return;
	  }

  /* External assets (fonts, icons) → network-first, fall back to cache */
  const isCacheable =
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('unpkg.com');

	  if (isCacheable) {
	    e.respondWith(
	      fetch(e.request)
	        .then(res => {
	          if (res && res.ok) {
	            const clone = res.clone();
	            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
	          }
	          return res;
	        })
	        .catch(() => caches.match(e.request))
	    );
	    return;
	  }

  /* Firebase & everything else → network only, fail silently */
  // (Firebase has its own offline persistence layer)
});
