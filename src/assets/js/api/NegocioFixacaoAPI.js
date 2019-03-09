import Vue from 'vue'

export default class NegocioFixacaoAPI{
  static saveNegocioFixacao(negocioFixacao, negocioCulturaId){
    return Vue.prototype.$axios.post('negocio_cultura/'+ negocioCulturaId + '/fixacao', negocioFixacao)
  }
}
