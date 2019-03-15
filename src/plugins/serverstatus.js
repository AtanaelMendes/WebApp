export default ({ app, Vue}) => {
  let isUp_temp = true;

  let serverStatus = {
    isUp: true,
    isDown: false,
  };

  function checkServerStatus() {
    Vue.prototype.$axios.get('/').then(() => {
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

  function registerEvent(status){
    navigator.serviceWorker.controller.postMessage({messageType: 'online', payload: status});
  }

  setInterval(checkServerStatus, 2000);

  Vue.prototype.serverStatus = serverStatus;
}
