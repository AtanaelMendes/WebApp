import Vue from 'vue'
import { Loading, Dialog } from 'quasar'

export default {
  options(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios(
        { url: 'busca-endereco', baseURL: 'http://demo3716022.mockable.io/', method: 'get' }).then( response =>{
        resolve(response.data);
        // console.log(response.data);
      }).catch(error =>{
        reject(error)
      })
    });
  }
// { url: 'lista-areas', baseURL: 'http://demo3716022.mockable.io/', method: 'put', data: params }
}
