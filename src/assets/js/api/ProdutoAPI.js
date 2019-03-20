import Vue from 'vue'

export default class ProdutoAPI{
  static searchByName(name){
    return Vue.prototype.$axios.get('/produto?nome='+name)
  }
}
