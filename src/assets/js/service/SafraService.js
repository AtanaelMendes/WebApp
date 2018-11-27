import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'

export default {
  getSafra(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/safra/' + id).then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listSafras(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/safra').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveSafra(params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/' + produtor_id + '/safra', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteSafra(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/' + produtor_id + '/safra/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreSafra(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/safra/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateSafra(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/safra/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
}
