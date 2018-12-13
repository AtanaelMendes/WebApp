import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {
  listCulturas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/' + produtor_id).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveCultura(params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('cultura/' + produtor_id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteCultura(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('cultura/' + id + '/produtor/' + produtor_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreCultura(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveCultura(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateCultura(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

  listMarcas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/' + produtor_id).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveMarca(params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('cultura/' + produtor_id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteMarca(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('cultura/' + id + '/produtor/' + produtor_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreMarca(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveMarca(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateMarca(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

  listCultivar(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/' + produtor_id).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveCultivar(params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('cultura/' + produtor_id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteCultivar(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('cultura/' + id + '/produtor/' + produtor_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreCultivar(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveCultivar(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateCultivar(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + id + '/produtor/' + produtor_id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

}
