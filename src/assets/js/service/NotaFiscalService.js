import Vue from 'vue'
export default {
  listAreas(filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios(
        { url: 'lista-areas', baseURL: 'http://demo3716022.mockable.io/' }).then( response =>{
        resolve(response);
      }).catch(error =>{
        reject(error)
      })
    });
  },
  getAreaByID(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios({ url: 'area-detalhes', baseURL: 'http://demo3716022.mockable.io/' } ).then( response =>{
        // console.log(response)
        resolve(response);
      }).catch(error =>{
        reject(error)
      })
    });
  },
  saveArea(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios( { url: 'area-create', baseURL: 'http://demo3716022.mockable.io/', method: 'post', data: params } ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateArea(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios( { url: 'area-update', baseURL: 'http://demo3716022.mockable.io/', method: 'put', data: params } ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
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
