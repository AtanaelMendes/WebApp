import Vue from 'vue'

export default class NegocioProdutoAPI{
  static saveNegocioProduto(negocioProduto, negocioId){
    return Vue.prototype.$axios.post('negocio/'+ negocioId + '/produto', negocioProduto);
  }

  static deleteNegocioProduto(id, negocioId){
    return Vue.prototype.$axios.delete('negocio/'+ negocioId + '/produto/' + id);
  }
}
