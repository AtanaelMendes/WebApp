/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

self.addEventListener('fetch', function(event) {
  if(event.request.method === "GET"){
    event.respondWith(
      caches.open('agro_project').then(function(cache) {
        return fetch(event.request).then(function (response) {
          console.log('nova requisição')
          cache.put(event.request, response.clone());
          return response;
        }).catch(function () {
          console.log('pegando do cache')
          return caches.match(event.request).catch(function () {
            console.log('erro no cache')
          })
        })
      })
    );
  }
});

/*self.addEventListener('fetch', function(event) {
  if(event.request.method === "GET"){
    console.log("event.request")
    //console.log(event.request)
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if(response){
          console.log('cache.response')
          console.log(response)
          console.log('etag:' + response.headers.get('etag'))
          return response
        }else{
          saveOnCache(event.request);
          return fetch(event.request).then(function (response) {
            console.log('fetch.response')
            console.log(response)
            console.log('etag:' + response.headers.get('etag'))
            return response;
          })
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
}*/


