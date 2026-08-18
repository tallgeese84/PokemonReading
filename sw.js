/* Poké Reading — service worker
   CACHE must match APP_VERSION in index.html.
   Bump CACHE on every deploy. Upload this file together with index.html;
   uploading index.html alone is what leaves a device stuck on an old build. */
const CACHE = 'poke-reading-1.7.1';
const SPRITES = 'poke-reading-sprites-1.7.1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).catch(()=>{})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== SPRITES).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* Pokémon artwork: cache-first and kept in its own bucket, so a code
     deploy never throws away sprites the child already has offline. */
  if (url.hostname === 'raw.githubusercontent.com') {
    e.respondWith(
      caches.open(SPRITES).then(c =>
        c.match(req).then(hit => hit || fetch(req).then(res => {
          if (res && (res.status === 200 || res.type === 'opaque')) c.put(req, res.clone());
          return res;
        }).catch(() => hit))
      )
    );
    return;
  }

  const isPage = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isPage) {
    /* network-first: a new build shows up on the next online visit */
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type !== 'opaque') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
