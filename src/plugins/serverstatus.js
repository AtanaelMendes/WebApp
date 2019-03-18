import ServiceMessage from "../assets/js/serviceWorker/ServiceMessage";
import ServiceWorker from "../assets/js/serviceWorker/ServiceWorker";

export default ({ app, Vue, router}) => {
  let isUp_temp = true;

  let serverStatus = {
    isUp: true,
    isDown: false,
  };

  function checkServerStatus() {
    if(router.app._route.path !== '/login'){
      Vue.prototype.$axios.get('/status').then(() => {
        if(!isUp_temp){
          serverStatus.isUp = true;
          serverStatus.isDown = false;
          registerEvent(serverStatus.isUp)
        }
        isUp_temp = true;
      }).catch(() => {
        if(isUp_temp){
          serverStatus.isUp = false;
          serverStatus.isDown = true;
          registerEvent(serverStatus.isUp)
        }
        isUp_temp = false;
      })
    }
  }

  function registerEvent(status){
    ServiceWorker.sendMessage(new ServiceMessage(ServiceMessage.SERVER_STATUS, status));
  }

  setInterval(checkServerStatus, 2000);

  Vue.prototype.serverStatus = serverStatus;
}
