import Vue from 'vue'

export default class NegocioAPI{

  static listTiposNegocios(produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/tipo_negocio');
  }

  static listNegocios(produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/negocio');
  }

  static getById(id, fullType, produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/negocio/'+ id + (fullType ? '?type=full' : ''));
  }

  static saveNegocio(negocio, produtorId){
    return Vue.prototype.$axios.post('produtor/'+ produtorId + '/negocio', negocio);
  }

  static updateNegocio(negocio, id, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/'+ id, negocio);
  }

  static archiveNegocio(id, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/' + id + '/archive');
  }

  static restoreNegocio(id, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/negocio/' + id +'/restore');
  }

  static deleteNegocio(id, produtorId){
    return Vue.prototype.$axios.delete('produtor/'+ produtorId + '/negocio/' + id);
  }
}
