import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listTickets(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/tickets').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveTicket(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ produtorId + '/ticket', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deleteTicket(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/'+ produtorId + '/ticket/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
}
