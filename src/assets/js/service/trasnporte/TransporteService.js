import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listCargasCarregando(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entregas?staus=carregando').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listCargasNoArmazem(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entregas?staus=no-armazem').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listCargasEntregues(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entregas?staus=entregues').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },

  getCargaById(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega/'+ id).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveNovaCarga(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ produtorId + '/entrega', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updateEntrega(id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  archiveEntrega(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  restoreEntrega(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/' + id +'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deleteEntrega(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/'+ produtorId + '/entrega/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
}
