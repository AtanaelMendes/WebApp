import Vue from 'vue'

export default class ArmazemAPI{

  static listArmazens(produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem');
  }

  static listArmazensByEntrega(entregaId, produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem/by_entrega/' + entregaId);
  }
}
