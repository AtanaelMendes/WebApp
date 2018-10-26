import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'

export default {
  listPessoas(filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa?' + AgroUtils.serialize(filter) ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
}
