import Vue from 'vue'

export default class NegocioTituloAPI{

  static saveNegocioTitulo(negocioTitulo, negocioId){
    return Vue.prototype.$axios.post('negocio/'+ negocioId + '/titulo', negocioTitulo);
  }

  static deleteNegocioTitulo(id, negocioId){
    return Vue.prototype.$axios.delete('negocio/'+ negocioId + '/titulo/' + id);
  }
}
