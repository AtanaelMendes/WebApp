import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listEntregasCarregando(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega?status=carregando').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listEntregasNoArmazem(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega?status=no_armazem').then( response => {
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
  saveEntrega(params){
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
  saveTalhaoPercentage(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
}
