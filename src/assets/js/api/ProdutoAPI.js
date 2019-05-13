import Vue from 'vue'

export default class ProdutoAPI{
  static searchByName(name){
    return Vue.prototype.$axios.get('/produto?nome='+name)
  }

  static listProdutores(){
    return Vue.prototype.$axios.get( 'produtor' );
  }

  static saveProdutor(produtor){
    return Vue.prototype.$axios.post('produtor', produtor);
  }
}
