import Vue from 'vue'

export default class NegocioCulturaAPI{

  static getByProdutor(filter){
    return Vue.prototype.$axios.get('negocio/cultura/by_produtor' + (filter ? "?"+filter : ''));
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

  static listNegociosCulturasByCultura(safraCulturaId){
    return Vue.prototype.$axios.get('negocio/cultura/by_safra_cultura/' + safraCulturaId)
  }

  static addNegocioCultura(negocioCultura, negocioId){
    return Vue.prototype.$axios.post('negocio/'+ negocioId + '/cultura', negocioCultura);
  }

  static deleteNegocioCultura(id, negocioId){
    return Vue.prototype.$axios.delete('negocio/'+ negocioId + '/cultura/' + id);
  }

  static getAllNotasFiscaisByNegocioCulturaAndArmazem(negocioCulturaId, armazemId){
    return Vue.prototype.$axios.get('negocio/cultura/' + negocioCulturaId +  '/nota_fiscal?armazem_id=' + armazemId);
  }

  static transferir(negocioCulturaId, params){
    return Vue.prototype.$axios.post('/negocio/cultura/'+negocioCulturaId+'/transferir', params);
  }

  static atualizarTransferencia(negocioCulturaId, transferenciaId, params){
    return Vue.prototype.$axios.put('/negocio/cultura/'+negocioCulturaId+'/transferir/' + transferenciaId, params);
  }

  static listNegociosCulturasParaTransferir(negocioCulturaId, filter){
    return Vue.prototype.$axios.get('/negocio/cultura/'+negocioCulturaId+'/transferir/negocio' + (filter ? "?"+filter : ''));
  }
}
