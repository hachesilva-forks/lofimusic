const cacheName = "app-" + "06067dacb7e4af13748768f065b6851370286cc7";

self.addEventListener("install", event => {
  console.log("installing app worker 06067dacb7e4af13748768f065b6851370286cc7");
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/",
        "/app.css",
        "/app.js",
        "/manifest.json",
        "/wasm_exec.js",
        "/web/app.wasm",
        "/web/lofimusic.css",
        "/web/logo.png",
        "/web/range.css",
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap",
        "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("app worker 06067dacb7e4af13748768f065b6851370286cc7 is activated");
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
