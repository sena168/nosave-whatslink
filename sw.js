const CACHE_NAME = 'wa-direct-v2'; // Version bump for new cache strategy
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/countries.json' // NEW: Cache country data
    // Add your icon files here if you create them!
];

// Install event: Caches all necessary files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache v2');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event: Clears old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
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
