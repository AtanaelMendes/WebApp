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
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega?status=entregue').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },

  getEntregaById(id){
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
  sendEntregaToArmazen(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entrega_id + '/enviar_entrega', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  addNegocioToEntrega(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('entrega/'+ entrega_id + '/negocio', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  delteNegocioOfEntrega(entrega_id, negocio_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('entrega/'+ entrega_id + '/negocio/' + negocio_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updateNegociosQuantidade(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('entrega/'+ entrega_id + '/negocio', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  addTalhaoToEntrega(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/'+ produtorId + '/entrega/'+ entrega_id + '/talhao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  delteTalhaoOfEntrega(entrega_id, talhao_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/'+ produtorId + '/entrega/'+ entrega_id + '/talhao/' + talhao_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  listTalhoesFromEntrega(entrega_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega/' + entrega_id + '/talhoes').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateTalhoesPercentual(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entrega_id + '/talhoes', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updateMotorista(entrega_id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entrega_id + '/motorista', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updateNotaFiscalItemOfNegocio(entrega_id, id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entrega_id + '/nota_fiscal_item/' + id, params).then(response => {
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
