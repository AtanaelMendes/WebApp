import Vue from 'vue'
export default {
  getSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveSafraCultura(safra_id, safraCultura){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('safra/' + safra_id + '/safra_cultura', safraCultura).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateSafraCultura(safra_id, safra_cultura_id, safraCultura){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('safra/' + safra_id + '/safra_cultura/' + safra_cultura_id, safraCultura).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/safra/' + safra_id + '/safra_cultura/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/safra/' + safra_id + '/safra_cultura/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteSafraCultura(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/safra/' + safra_id + '/safra_cultura/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listSafraCulturas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/'+ produtor_id +'/safra/safra_cultura').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listCulturas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/cultura/simple_list').then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
    });
  },
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
  listCultivaresByMarca(culturaId, marcaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/'+culturaId+'/cultivar?marca_id='+ marcaId).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },

  listCultivares(culturaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('cultura/'+culturaId+'/cultivar').then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },

  listFullSafraCulturaTalhao(safra_cultura_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao?type=full').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateSafraCulturaTalhao(safra_cultura_id, id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteSafraCulturaTalhao(safra_cultura_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveCultivarToSafraCulturaTalhao(safra_cultura_id, safra_cultura_talhao_id, cultivar_id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao/' + safra_cultura_talhao_id + '/add_cultivar/' + cultivar_id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getDiario(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/diario').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getDiarioClassificacao(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/diario-classificacao').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getAreas(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/areas').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getTalhoes(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/talhoes').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getMarcas(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/marcas').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getCultivares(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/cultivares').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getCaminhoes(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/caminhoes').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

  getArmazens(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/armazens').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

}
