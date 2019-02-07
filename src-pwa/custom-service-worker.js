/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// Install Service Worker
self.addEventListener('install', function(event){
  console.log('installed!');
});

// Service Worker Active
self.addEventListener('activate', function(event){
  console.log('activated!');
});


self.addEventListener('fetch', function(event) {
  if(event.request.method === "GET"){
    event.respondWith(
      caches.open('agro_project').then(function(cache) {
        return fetch(event.request).then(function (response) {
          if(response.headers.get('content-type') !== 'application/json'){
            return response;
          }
          cache.put(event.request, response.clone());
          return response;
        }).catch(function () {
          return caches.match(event.request).catch(function () {
            //console.log('erro no cache')
          })
        })
      })
    );
  }
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'queueSync') {
    //event.waitUntil(doSync());
    sendMessageToAllClients('sync')
  }
});

function sendMessageToClient(client, message) {
  return new Promise(function (resolve, reject) {
    let messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = function(event){
      if(event.data.error){
        reject(event.data.error)
      }else{
        resolve(event.data)
      }
    };

    client.postMessage(message, [messageChannel.port2])
  })
}

function sendMessageToAllClients(message){
  clients.matchAll({includeUncontrolled: true, type: 'window'}).then(clients => {
    clients.forEach(client => {
      sendMessageToClient(client, message).then(m => {
        console.log("SW Received Message: "+m)
      });
    })
  })
}


