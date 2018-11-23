import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'

export default {
  /*getPessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/pessoa/' + id).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  },*/
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
  /*savePessoa(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/pessoa', params).then(response => {
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
  },*/
}
