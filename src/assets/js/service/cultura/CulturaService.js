import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {

  // CULTURAS
  listCulturas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/cultura').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveCultura(params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/' + produtor_id + '/cultura', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteCultura(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/' + produtor_id + '/cultura/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreCultura(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/cultura/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveCultura(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/cultura/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateCultura(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/cultura/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

  // MARCAS
  listMarcas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/marca').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveMarca(params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/' + produtor_id + '/marca', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteMarca(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/' + produtor_id + '/marca/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreMarca(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/marca/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveMarca(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/marca/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateMarca(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/marca/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

  // CULTIVARES
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
  saveCultivar(cultura_id, params){
    //let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('cultura/' + cultura_id + '/cultivar', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteCultivar(cultura_id, id){
    //let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('cultura/' + cultura_id + '/cultivar/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreCultivar(cultura_id, id){
    //let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + cultura_id + '/cultivar/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveCultivar(cultura_id, id){
    //let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + cultura_id + '/cultivar/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateCultivar(culturaId, id, params){
    //let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('cultura/' + cultura_id + '/cultivar/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

  // OUTROS
  selectUnidadeArea: function(){
    return new Promise((resolve, reject) => {
      this.getUnidadeArea().then(response => {
        let unidadeAreaOptions = response.data.map(unit => {
          return {
            value: unit.id,
            label: unit.nome,
            sublabel: unit.descricao
          }
        });
        resolve(unidadeAreaOptions)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUnidadeArea(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'unidade?type=area' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  selectUnidadeMedida: function(){
    return new Promise((resolve, reject) => {
      this.getUnidadeMedida().then(response => {
        let unidadeMediaOptions = response.data.map(unit => {
          return {
            value: unit.id,
            label: unit.nome,
            sublabel: unit.descricao
          }
        });
        resolve(unidadeMediaOptions)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUnidadeMedida(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'unidade?type=medida' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },


}
