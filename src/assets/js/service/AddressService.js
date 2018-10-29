import Vue from 'vue'
import { Loading, Dialog } from 'quasar'

export default {
  getAddressByID(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios( { url: 'pessoa/1/endereco/1', baseURL: 'http://demo3716022.mockable.io/' } ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
