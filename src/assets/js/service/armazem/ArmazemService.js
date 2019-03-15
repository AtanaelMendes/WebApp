import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listArmazens() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem').then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listArmazensByEntrega(entregaId) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem/by_entrega/' + entregaId).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  addArmazem(params) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/' + produtorId + '/armazem', params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
}
