const cacheName = "tirta-cache-v1";
const assetsToCache = [
  "/",
  "/home.html",
  "/about_us.html",
  "/Location.html",
  "/staff.html",
  "/Facility.html",
  "/assets/BetterHeader_BG.jpeg",
  "/assets/Classroom.jpeg",
  "/assets/Laboratorium.jpeg",
  "/assets/Foto Founder.jpg",
  "/assets/icon-192.png",
  "/assets/icon-512.png"
];

// Install event – caching assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(assetsToCache);
      })
      .catch((err) => {
        console.error("Cache install failed:", err);
      })
  );
});

// Fetch event – serving from cache if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});

// Optional: Activate event – cleanup old caches if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});
