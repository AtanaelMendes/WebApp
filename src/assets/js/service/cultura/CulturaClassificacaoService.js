import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {

  listClassificacoesByCultura(cultura_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/' + cultura_id + '/classificacao').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
}
