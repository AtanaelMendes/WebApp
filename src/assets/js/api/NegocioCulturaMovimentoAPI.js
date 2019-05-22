import Vue from 'vue'

export default class NegocioCulturaMovimentoAPI {

  static getTipos() {
    return Vue.prototype.$axios.get('negocio/cultura/movimento/tipo');
  }

  static saveMovimento(negocioCulturaId, params){
    return Vue.prototype.$axios.post('/negocio/cultura/'+negocioCulturaId+'/movimento', params);
  }

  static getAllMovimentosByNegocioCultura(negocioCulturaId){
    return Vue.prototype.$axios.get('negocio/cultura/' + negocioCulturaId +  '/movimento');
  }

  static getAllMovimentosByNegocioCulturaAndArmazem(negocioCulturaId, armazemId){
    return Vue.prototype.$axios.get('negocio/cultura/' + negocioCulturaId +  '/movimento?armazem_id=' + armazemId);
  }
  static getMovimento(id){
    return Vue.prototype.$axios.get('negocio/cultura/movimento/' + id);
  }

  static updateMovimento(id, params){
    return Vue.prototype.$axios.put('negocio/cultura/movimento/' + id, params);
  }
}
