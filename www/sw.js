// Service Worker pour Visit Limbe PWA v2.1.0
const CACHE_NAME = 'visit-limbe-v2.1.0';
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Material+Icons:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Icons+Outlined:wght@300;400;500;600;700&display=swap',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching App Shell');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker: App Shell Cached');
                return self.skipWaiting();
            })
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

// Stratégie Cache First avec fallback réseau
self.addEventListener('fetch', (event) => {
    // Ignore les requêtes non-GET et les URLs externes
    if (event.request.method !== 'GET' || 
        !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si trouvé en cache, retourner la version cachée
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Sinon, faire une requête réseau
                return fetch(event.request)
                    .then((response) => {
                        // Vérifier si la réponse est valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cloner la réponse pour la mettre en cache
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // En cas d'erreur réseau, servir une page hors ligne si disponible
                        if (event.request.destination === 'document') {
                            return caches.match('/visit-limbe-app-preview.html');
                        }
                    });
            })
    );
});

// Écouter les messages pour les mises à jour
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Notification de mise à jour disponible
self.addEventListener('controllerchange', () => {
    window.location.reload();
});
