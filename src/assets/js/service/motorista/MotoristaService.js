import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listMotoristas() {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtorId + '/motorista').then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveMotorista(params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/' + produtor_id + '/motorista', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
