/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/*
self.addEventListener('fetch', function(event) {
  if(event.request.method === "GET"){
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if(response){
          return response
        }else{
          saveOnCache(event.request);
          return fetch(event.request)
        }
      })
    );
  }
});

function saveOnCache(request) {
  caches.open('agro_project').then(function(cache) {
    return fetch(request).then(function(response) {
      cache.put(request, response.clone());
      return response;
    });
  });
}
*/


