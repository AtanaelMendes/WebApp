import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {

  listContasPorPessoa(pessoa_id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+ produtor_id +'/conta_bancaria').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
