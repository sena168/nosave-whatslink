const CACHE_NAME = 'wa-direct-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
    // Add your icon files here if you create them!
];

// Install event: Caches all necessary files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: Serves content from cache if available
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache match - fetch from network
                return fetch(event.request);
            })
    );
});
