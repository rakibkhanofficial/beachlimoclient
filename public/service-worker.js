// public/service-worker.js

const CACHE_NAME = 'beachlimofl';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles/main.css',
        '/scripts/main.js'
        // Add other assets to cache here
      ]);
    })
  );
});
