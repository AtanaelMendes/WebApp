import Vue from 'vue'

export default class NegocioCulturaAPI{

  static getByProdutor(produtorId){
    return Vue.prototype.$axios.get('negocio/cultura/by_produtor/' + produtorId);
  }

  static listArmazensByNegocioCultura(negocioCulturaId){
    return Vue.prototype.$axios.get('negocio/cultura/' + negocioCulturaId + '/armazem');
  }

  static listNegociosCulturas(negocioId){
    return Vue.prototype.$axios.get('negocio/'+ negocioId + '/cultura?filter=without_empty');
  }

  static listNegociosCulturasByEntrega(entregaId){
    return Vue.prototype.$axios.get('negocio/cultura/by_entrega/' + entregaId);
  }

  static addNegocioCultura(negocioCultura, negocioId){
    return Vue.prototype.$axios.post('negocio/'+ negocioId + '/cultura', negocioCultura);
  }

  static deleteNegocioCultura(id, negocioId){
    return Vue.prototype.$axios.delete('negocio/'+ negocioId + '/cultura/' + id);
  }
}
