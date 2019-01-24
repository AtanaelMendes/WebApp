import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listPesagens(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/tickets').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  savePesagem(entregaId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('entrega/'+ entregaId + '/pesagem', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deletePesagem(entregaId, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('entrega/'+ entregaId + '/pesagem/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
}
