import Vue from 'vue'
export default {

  listUnidadesMedida(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'unidade?type=medida' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listUnidadesArea(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'unidade?type=area' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  options(){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios(
        { url: 'lista-unidade-medida', baseURL: 'http://demo3716022.mockable.io/', method: 'get' }).then( response =>{
        resolve(response.data);
        // console.log(response.data);
      }).catch(error =>{
        reject(error)
      })
    });
  }
// { url: 'lista-areas', baseURL: 'http://demo3716022.mockable.io/', method: 'put', data: params }
}
