import Vue from 'vue'

export default class LocalizacaoAPI{

  static getLocalizacao(id, pessoaId){
    return Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/localizacao/' + id );
  }

  static listLocalizacaos(pessoaId){
    return Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/localizacao' );
  }

  static listLocalizacoesByProdutor(produtorId){
    return Vue.prototype.$axios.get( 'produtor/' + produtorId + '/localizacao' );
  }

  static saveLocalizacao(localizacao, pessoaId){
    return Vue.prototype.$axios.post('/pessoa/' + pessoaId + '/localizacao', localizacao);
  }

  static updateLocalizacao(localizacao, id, pessoaId){
    return Vue.prototype.$axios.put('/pessoa/' + pessoaId + '/localizacao/'+ id, localizacao);
  }

  static deleteLocalizacao(id, pessoaId){
    return Vue.prototype.$axios.delete('/pessoa/' + pessoaId + '/localizacao/' + id);
  }

  static archiveLocalizacao(id, pessoaId){
    return Vue.prototype.$axios.put('/pessoa/' + pessoaId + '/localizacao/' + id + '/archive');
  }

  static restoreLocalizacao(id, pessoaId){
    return Vue.prototype.$axios.put('/pessoa/' + pessoaId + '/localizacao/' + id + '/restore');
  }
}
