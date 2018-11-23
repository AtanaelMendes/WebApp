import Vue from 'vue'
export default {
  listTalhao(talhaoId, filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'area/' + talhaoId + '/talhao' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  getTalhaoById(areaId, talhaoId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('area/' + areaId +'/talhao/' + talhaoId).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveTalhao(areaId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/area/'+ areaId + '/area', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updateTalhao(areaId, talhaoId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/area/' + areaId + '/talhao/' + talhaoId, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deleteTalhao(talhaoId, areaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios( { url: 'talhao-delete/'+ talhaoId + '/'+ areaId, baseURL: 'http://demo3716022.mockable.io/', method: 'delete' } ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
