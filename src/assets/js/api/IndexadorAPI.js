import Vue from 'vue'

export default class IndexadorAPI{
  static listIndexadores(){
    return Vue.prototype.$axios.get('/indexador');
  }
}
