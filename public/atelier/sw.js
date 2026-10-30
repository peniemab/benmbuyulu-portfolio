// Atelier service worker: makes the atelier installable, never serves stale pages.
// v1 served a cached /atelier forever, so after each deploy the installed app ran
// old code and every save failed. Pages now always come from the network.
const CACHE = "atelier-v2";
const STATIC = ["/atelier/manifest.webmanifest", "/atelier/icon-192.png", "/atelier/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(STATIC))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Icons and manifest: cache first (they rarely change).
  if (STATIC.includes(url.pathname)) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
  }
  // Everything else (pages, saves, data) goes straight to the network.
});
