// Menambahkan event listener untuk event 'install' pada service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('app-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        'index.html',
        'style.css',
        'script.js',
        'logo.png'
      ]);
    })
  );
});

// Menambahkan event listener untuk event 'fetch' pada service worker
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
