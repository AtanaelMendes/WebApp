import Vue from 'vue'
import { Loading, Dialog } from 'quasar'

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
  getAddressByID(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios(
        { url: 'area-detalhes', baseURL: 'http://demo3716022.mockable.io/' }).then( response =>{
        resolve(response);
      }).catch(error =>{
        reject(error)
      })
    });
  }
// { url: 'lista-areas', baseURL: 'http://demo3716022.mockable.io/', method: 'put', data: params }
}
