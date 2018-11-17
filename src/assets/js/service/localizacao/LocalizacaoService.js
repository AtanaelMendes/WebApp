import Vue from 'vue'
import { Loading, Dialog } from 'quasar'

export default {
  deleteLocalizacao(localizacaoId, pessoaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/pessoa/' + pessoaId + '/localizacao/' + localizacaoId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listLocalizacoes(pessoaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/localizacao' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  getLocalizacao(pessoaId, localizacaoId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/localizacao/' + localizacaoId ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveLocalizacao(pessoaId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/pessoa/' + pessoaId + '/localizacao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
