import Vue from 'vue'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  listAreas(filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/' + produtorId + '/area' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveArea(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/produtor/'+ produtorId + '/area', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  getAreaById(areaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/' + produtorId + '/area/' + areaId).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateArea(areaId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/' + produtorId + '/area/' + areaId, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deleteArea(areaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/produtor/' + produtorId + '/area/' + areaId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  archiveArea(areaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/' + produtorId + '/area/' + areaId + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  restoreArea(areaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/produtor/' + this.produtorId + '/area/' + areaId + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
};

