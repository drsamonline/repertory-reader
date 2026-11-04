/* The Repertory Desk — service worker.
   HTML is network-first so a release is never hidden behind a stale cache.
   catalog.json is network-first too: it is the shelf, and a reader who came
   yesterday must not be shown the library as it was a week ago. Chapters are
   immutable once published, so they stay cache-first with a background
   refresh — that is what makes a second visit work with no connection. */
const CACHE = "repertory-desk-v2.1.1-2026-11-04";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isDoc = req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html");
  const isLib = /\.json$/.test(url.pathname);
  const isCatalog = url.pathname.endsWith("/catalog.json");

  if (isDoc) {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return r;
      }).catch(() => caches.match(req).then(r => r || caches.match("index.html")))
    );
    return;
  }
  if (isCatalog) {
    // the manifest changes when a volume is renamed or re-extracted, so it is
    // network-first; the cached copy is only the offline fallback
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return r;
      }).catch(() => caches.match(req))
    );
    return;
  }
  if (isLib) {
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(r => {
          if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return r;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
