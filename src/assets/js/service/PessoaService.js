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
      Vue.prototype.$axios.post('/pessoa', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
