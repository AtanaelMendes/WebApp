import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {

  listMoedas() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/moeda').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
