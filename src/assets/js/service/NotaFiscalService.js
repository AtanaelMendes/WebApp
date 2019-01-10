import Vue from 'vue'
export default {
  listNotas(filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios(
        { url: 'lista-areas', baseURL: 'http://demo3716022.mockable.io/' }).then( response =>{
        resolve(response);
      }).catch(error =>{
        reject(error)
      })
    });
  },
  getNotaById(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios({ url: 'produtos-nfe', baseURL: 'http://demo3716022.mockable.io/' } ).then( response =>{
        // console.log(response)
        resolve(response);
      }).catch(error =>{
        reject(error)
      })
    });
  },
  listSeries(){
    return new Promise((resolve, reject) => {
      let produtor_id = localStorage.getItem('account.produtor_id');
      Vue.prototype.$axios.get('/produtor/' + produtor_id + '/nota_fiscal_serie').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  }
}
