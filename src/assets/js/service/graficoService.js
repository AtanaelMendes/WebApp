import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {
  listContatos(pessoaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/contato' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  getContato(pessoaId, contatoId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/contato/' + contatoId ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
}
