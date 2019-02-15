import Vue from 'vue'

export default class NegocioCulturaAPI{

  static getByProdutor(produtorId){
    return Vue.prototype.$axios.get('negocio/cultura/by_produtor/' + produtorId);
  }

  static listArmazensByNegocioCultura(negocioCulturaId){
    return Vue.prototype.$axios.get('negocio/cultura/' + negocioCulturaId + '/armazem');
  }
}
