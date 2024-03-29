/* Asignar nombre y vversion de la cache */
const CACHE_NAME = 'v1_cache_luis_luna_pwa';

/* Archivos a cachear en app */
var urlsToCache = [
  './',
  './css/styles.css',
  './img/favicon.png',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/facebook.png',
  './img/favicon-16.png',
  './img/favicon-32.png',
  './img/favicon-64.png',
  './img/favicon-96.png',
  './img/favicon-128.png',
  './img/favicon-192.png',
  './img/favicon-256.png',
  './img/favicon-384.png',
  './img/favicon-512.png',
  './img/favicon-1024.png',
  './img/instagram.png',
  './img/twitter.png'
];

/* Eventos */

/* Intall =>  Instalacion del service worker */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => { return cache.addAll(urlsToCache).then(() => { self.skipWaiting() }) })
    .catch(err => { console.log("No se ha registrado el cache", err); })
  )
});


/*
 * Activate
 * Permite que la app funcione sin conexion
 */
self.addEventListener('activate', e => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            /* Borrar elementos que no se necesitan */
            return caches.delete(cacheName);
          }
        })
      )
    })
    .then(() => {
      /* Activar cache */
      self.clients.claim();
    })
  );

});

/*
 * Fetch
 * Al solicitar una url comprueba que los recursos esten en cache,
 * si no, los recupera del servidor
 */
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(res => {
      if (res) {
        /* Se devulven datos de cache */
        return res;
      }

      return fetch(e.request);
    })
  );
});
