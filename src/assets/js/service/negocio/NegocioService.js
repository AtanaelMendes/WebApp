import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listTipoNegocios(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/tipo_negocio').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listNegocios(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/negocio').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  getNegocioById(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/negocio/'+ id).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveNegocio(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ produtorId + '/negocio', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updateNegocio(id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  archiveNegocio(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  restoreNegocio(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/' + id +'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deleteNegocio(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/'+ produtorId + '/negocio/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

  saveAttachCultura(negocioId, negocioCultura){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('negocio/'+ negocioId + '/cultura', negocioCultura).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  listNegociosCulturas(negocioId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('negocio/'+ negocioId + '/cultura').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

  saveAttachTitulo(negocioId, negocioTitulo){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('negocio/'+ negocioId + '/titulo', negocioTitulo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  saveAttachProduto(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ produtorId + '/negocios', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  saveAttachFixacao(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ produtorId + '/negocios', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

}
// getPessoa(id){
//   return new Promise((resolve, reject) => {
//     Vue.prototype.$axios.get('/pessoa/' + id).then(response => {
//       resolve(response.data)
//     }).catch(error => {
//       reject(error)
//     })
//   });
// },
