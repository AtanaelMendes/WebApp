import Vue from 'vue'
export default {
  listAreas(filter){
    let id = localStorage.getItem('account.produtor_id')
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/' + id + '/area' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  getAreaById(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/pessoa/' + id).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveArea(params){
    return new Promise((resolve, reject) => {
      let produtor_id = localStorage.getItem('account.produtor_id')
      Vue.prototype.$axios.post('/produtor/'+ produtor_id + '/area', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updateArea(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + id, params).then(response => {
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
  searchLocalizacao(terms){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios(
        { url: 'busca-localizacao', baseURL: 'http://demo3716022.mockable.io/', method: 'get' }).then( response =>{
        resolve(this.parseLocalizacao(response.data));
        // console.log(response.data);
      }).catch(error =>{
        reject(error)
      })
    });
  },
  parseLocalizacao(local) {
    return local.map(localizacao => {
      return {
        label: localizacao.endereco + ', ' + localizacao.numero,
        sublabel: localizacao.cidade + ', ' + localizacao.estado,
        id: localizacao.id
      }
    })
  },
}
