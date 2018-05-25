var staticCacheName = 'mws-static-v1';
var cacheFiles = [
  '/',
  './main.js',
  './restaurant_info.js',
  './dbhelper.js',
  '../css/style.min.css',
  '../img/wet_snow.png',
  '../img/1.jpg',
  '../img/2.jpg',
  '../img/3.jpg',
  '../img/4.jpg',
  '../img/5.jpg',
  '../img/6.jpg',
  '../img/7.jpg',
  '../img/8.jpg',
  '../img/9.jpg',
  '../img/10.jpg'
];


self.addEventListener('install', function(event) {
    event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      cacheNames.filter(function(cacheName){
        return cacheName.startsWith('mws-') && cacheName != staticCacheName;
      })
      .map(function(cacheName) {
        return cache.delete(cacheName);
      })
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
