import Vue from 'vue'
import { Loading, Dialog } from 'quasar'

export default {
  logout () {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('account/logout').then(() => {
        clearAccountInfo();
        resolve();
      }).catch(error => {
        reject(error)
      })

    });
  }
}


function clearAccountInfo(){
  localStorage.removeItem('auth.token');
  localStorage.removeItem('auth.refresh_token');
  localStorage.removeItem('account.produtor_id');
}
