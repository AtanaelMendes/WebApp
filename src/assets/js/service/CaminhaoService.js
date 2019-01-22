import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {

  listCaminhoes() {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+ produtor_id +'/caminhao').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  listFreeCaminhoes() {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+ produtor_id +'/caminhao/free').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
