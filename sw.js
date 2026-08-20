const CACHE='blessed-app-v9.10.4';
const ASSETS=['/index.html','/sw.js','/manifest.json','/consent_ca.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll({type:'window',includeUncontrolled:true})).then(cs=>cs.forEach(c=>c.postMessage({type:'SW_UPDATED'}))));});
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(url.origin!==location.origin)return;e.respondWith(fetch(e.request).then(res=>{const clone=res.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return res;}).catch(()=>caches.match(e.request)));});
