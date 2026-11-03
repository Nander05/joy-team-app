const CACHE = "joy-team-v2";
const FILES = ["./", "index.html", "manifest.webmanifest", "d3.min.js", "swirl.jpg", "swirl-small.jpg", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "fonts/anton-latin-400-normal.woff2", "fonts/dm-sans-latin-400-normal.woff2", "fonts/dm-sans-latin-500-normal.woff2", "fonts/dm-sans-latin-700-normal.woff2"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const sameOrigin = new URL(e.request.url).origin === location.origin;
  const isPage = e.request.mode === "navigate" || /\.(html|webmanifest)$/.test(new URL(e.request.url).pathname);
  if (isPage && sameOrigin) {
    // pagina: eerst online (altijd nieuwste versie), offline val je terug op de opgeslagen versie
    e.respondWith(fetch(e.request).then((r) => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); } return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((r) => {
    if (r.ok && sameOrigin) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match("index.html"))));
});
