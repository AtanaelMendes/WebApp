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
  getArmazemById(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem/'+ id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateArmazem(id, params) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id , params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveArmazem(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id + '/archive').then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreArmazem(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id +'/restore').then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteArmazem(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/' + produtorId + '/armazem/'+ id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
}
