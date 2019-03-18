/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

// Install Service Worker
//import ServiceMessage from "../src/assets/js/serviceWorker/ServiceMessage";

self.addEventListener('install', function(event){
  console.log('installed!');
  event.waitUntil(
    caches.open('agro_project').then(function(cache) {
      return cache.addAll([
        //'/',
        'statics/images/farmer.svg',
        'statics/images/login-background.jpg',
        'statics/images/no-image-16-10.svg',
        'statics/images/ajax-loading-gif.gif'
      ]);
    })
  );
});

// Service Worker Active
self.addEventListener('activate', function(event){
  console.log('activated!');
  self.clients.claim();
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

self.addEventListener('message', function(event){
  /*if(!event.data instanceof ServiceMessage){
    return;
  }*/

  //if (event.data.type === ServiceMessage.SERVER_STATUS) {
  //if (event.data.type === 'server_status') {
    sendMessageToAllClients(event.data)
  //}
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'queueSync') {
    //event.waitUntil(doSync());
    //sendMessageToAllClients('sync')
    //sendMessageToAllClients(new ServiceMessage(ServiceMessage.SYNC, null));
    sendMessageToAllClients({type:'sync', payload:null});
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
      sendMessageToClient(client, message).then(message => {
        switch (message) {
          case 'queueSyncFinished':
            sendMessageToAllClients(message);
            break;
        }
      });
    })
  })
}


