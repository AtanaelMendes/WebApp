import Vue from 'vue'

export default class CidadeAPI{

  static searchCidade(terms){
    return Vue.prototype.$axios.get('/cidade?nome=' + terms);
  }
}
