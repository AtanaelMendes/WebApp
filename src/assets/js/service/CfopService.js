import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {

  listCfops() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/cfop').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  getCfopByNumero(numero) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/cfop/' + numero).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
