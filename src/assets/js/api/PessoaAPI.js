import Vue from 'vue'

export default class PessoaAPI{
  static getPessoa(id){
    return Vue.prototype.$axios.get('/pessoa/' + id);
  }

  static listPessoas(filter){
    return Vue.prototype.$axios.get( 'pessoa' + (filter ? "?"+filter : '') );
  }

  static searchPessoa(value){
    return Vue.prototype.$axios.get( 'pessoa/search?value=' + value );
  }

  static savePessoa(pessoa){
    return Vue.prototype.$axios.post('/pessoa', pessoa);
  }

  static updatePessoa(pessoa, id){
    return Vue.prototype.$axios.put('/pessoa/' + id, pessoa);
  }

  static deletePessoa(id){
    return Vue.prototype.$axios.delete('/pessoa/' + id);
  }

  static archivePessoa(id){
    return Vue.prototype.$axios.put('/pessoa/' + id + '/archive');
  }

  static restorePessoa(id){
    return Vue.prototype.$axios.put('/pessoa/' + id + '/restore');
  }
}
