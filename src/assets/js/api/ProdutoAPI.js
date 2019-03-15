import Vue from 'vue'

export default class ProdutoAPI{
  static searchByName(name, produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/produto?nome='+name)
  }
}
