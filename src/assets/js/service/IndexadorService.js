import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {
  listIndexadores() {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/' + produtor_id + '/indexador').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
