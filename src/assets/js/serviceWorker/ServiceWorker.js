import ServiceMessage from "./ServiceMessage";

export default class ServiceWorker {

  static sendMessage(message){
    console.log('sendMessage')
    if(!message instanceof ServiceMessage){
      throw new Error("Objeto não é do tipo ServiceMessage!");
    }
    navigator.serviceWorker.controller.postMessage(message);
  }
}
