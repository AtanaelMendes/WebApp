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
  listCulturas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/cultura').then(response => {
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

  updateSafraCulturaTalhao(safra_cultura_id, id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('safra_cultura/' + safra_cultura_id + '/safra_cultura_talhao/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },

}
