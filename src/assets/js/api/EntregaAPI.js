import Vue from 'vue'

export default class EntregaAPI{

  static listEntregasByStatus(status, filter){
    return Vue.prototype.$axios.get('/entrega?status=' + status + (filter ? ("&" + filter) : ""));
  }

  static getEntrega(id){
    return Vue.prototype.$axios.get('/entrega/'+ id);
  }

  static saveEntrega(entrega){
    return Vue.prototype.$axios.post('/entrega', entrega);
  }

  static deleteEntrega(id){
    return Vue.prototype.$axios.delete('/entrega/' + id)
  }

  static sendToArmazem(params, entregaId){
    return Vue.prototype.$axios.put('/entrega/'+ entregaId + '/enviar_entrega', params);
  }

  static addNegocio(negocio, entregaId){
    return Vue.prototype.$axios.post('entrega/'+ entregaId + '/negocio', negocio);
  }

  static deleteNegocio(negocioId, entregaId){
    return Vue.prototype.$axios.delete('entrega/'+ entregaId + '/negocio/' + negocioId);
  }

  static updateNegocioQuantidade(params, entregaId){
    return Vue.prototype.$axios.put('entrega/'+ entregaId + '/negocio/update_quantidade', params);
  }

  static addTalhao(talhao, entregaId){
    return Vue.prototype.$axios.post('/entrega/'+ entregaId + '/talhao', talhao);
  }

  static deleteTalhao(talhaoId, entregaId){
    return Vue.prototype.$axios.delete('/entrega/'+ entregaId + '/talhao/' + talhaoId);
  }

  static listTalhoes(entregaId){
    return Vue.prototype.$axios.get('/entrega/' + entregaId + '/talhoes');
  }

  static updateTalhoesPercentual(params, entregaId){
    return Vue.prototype.$axios.put('/entrega/'+ entregaId + '/talhoes', params);
  }

  static updateMotorista(motorista, entregaId){
    return Vue.prototype.$axios.put('/entrega/'+ entregaId + '/motorista', motorista);
  }

  static updateArmazem(armazem, entregaId){
    return Vue.prototype.$axios.put('/entrega/'+ entregaId + '/armazem', armazem);
  }

  static addNotaFiscalToNegocio(notaFiscal, entregaId, negocioId){
    return Vue.prototype.$axios.post('entrega/'+ entregaId + '/negocio/' + negocioId + '/nota_fiscal', notaFiscal);
  }

  static updateNotaFiscalItemOfNegocio(params, notaFiscalItemId, entregaId){
    return Vue.prototype.$axios.put('/entrega/'+ entregaId + '/nota_fiscal_item/' + notaFiscalItemId, params);
  }

  static getFilterOptions(){
    return Vue.prototype.$axios.get('/entrega/filter_option');
  }
}
