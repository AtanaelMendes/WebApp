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
  updateMotorista(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/motorista/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveMotorista(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/motorista/'+ id +'/archive' ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreMotorista(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/motorista/'+ id +'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteMotorista(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/' + produtor_id + '/motorista/'+ id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
