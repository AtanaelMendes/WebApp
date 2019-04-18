import Vue from 'vue'

export default class NegocioFixacaoAPI{
  static saveNegocioFixacao(negocioFixacao, negocioCulturaId){
    return Vue.prototype.$axios.post('negocio_cultura/'+ negocioCulturaId + '/fixacao', negocioFixacao)
  }

  static deleteFixacao(id, negocioCulturaId){
    return Vue.prototype.$axios.delete('negocio_cultura/'+ negocioCulturaId + '/fixacao/' + id)
  }

  static deleteTituloFixacao(id, fixacaoId, negocioCulturaId){
    return Vue.prototype.$axios.delete('negocio_cultura/'+ negocioCulturaId + '/fixacao/' + fixacaoId + '/titulo/' + id);
  }
}
