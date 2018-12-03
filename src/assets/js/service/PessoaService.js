import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'

export default {
  getPessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/pessoa/' + id).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listPessoas(filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa?' + AgroUtils.serialize(filter) ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  savePessoa(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/pessoasdsdsd', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updatePessoa(id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deletePessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/pessoa/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  archivePessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  restorePessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

}
