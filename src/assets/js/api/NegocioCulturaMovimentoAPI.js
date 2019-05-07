import Vue from 'vue'

export default class NegocioCulturaMovimentoAPI{

  static getAllByNegocioCultura(negocioCulturaId){
    return Vue.prototype.$axios.get('negocio/cultura/' + negocioCulturaId +  '/movimento');
  }

  static getAllByNegocioCulturaAndArmazem(negocioCulturaId, armazemId){
    return Vue.prototype.$axios.get('negocio/cultura/' + negocioCulturaId +  '/movimento?armazem_id=' + armazemId);
  }
}
