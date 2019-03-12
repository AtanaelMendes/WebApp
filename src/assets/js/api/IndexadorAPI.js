import Vue from 'vue'

export default class IndexadorAPI{
  static listIndexadores(produtorId){
    return Vue.prototype.$axios.get('/produtor/' + produtorId + '/indexador');
  }
}
