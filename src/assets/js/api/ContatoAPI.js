import Vue from 'vue'

export default class ContatoAPI{

  static listContatos(pessoaId){
    return Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/contato' );
  }

  static getContato(id, pessoaId){
    return Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/contato/' + id );
  }

  static saveContato(contato, pessoaId){
    return Vue.prototype.$axios.post('/pessoa/' + pessoaId + '/contato', contato);
  }

  static updateContato(contato, id, pessoaId){
    return Vue.prototype.$axios.put('/pessoa/' + pessoaId + '/contato/' + id, contato);
  }

  static deleteContato(id, pessoaId){
    return Vue.prototype.$axios.delete('/pessoa/' + pessoaId + '/contato/' + id);
  }

  static archiveContato(id, pessoaId){
    return Vue.prototype.$axios.put('/pessoa/' + pessoaId + '/contato/' + id + '/archive');
  }

  static restoreContato(id, pessoaId){
    return Vue.prototype.$axios.put('/pessoa/' + pessoaId + '/contato/' + id + '/restore');
  }
}
