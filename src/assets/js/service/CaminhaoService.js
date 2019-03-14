import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {

  listCaminhoes() {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+ produtor_id +'/caminhao').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  listFreeCaminhoes() {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+ produtor_id +'/caminhao/free').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getCaminhaoById(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/'+ produtor_id +'/caminhao/'+ id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  addCaminhao(params) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/produtor/'+ produtor_id +'/caminhao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  updateCaminhao(id, params) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/'+ produtor_id +'/caminhao/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  archiveCaminhao(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+ produtor_id +'/caminhao/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  restoreCaminhao(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/'+ produtor_id +'/caminhao/'+id+'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  deleteCaminhao(id) {
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/produtor/'+ produtor_id +'/caminhao/'+id+'/delete').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
