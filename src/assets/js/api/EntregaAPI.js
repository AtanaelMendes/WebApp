import Vue from 'vue'

export default class AuthAPI{

  static listEntregasByStatus(status, filter, produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega?status=' + status + (filter ? ("&" + filter) : ""));
  }

  static getEntrega(id, produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega/'+ id);
  }

  static saveEntrega(entrega, produtorId){
    return Vue.prototype.$axios.post('produtor/'+ produtorId + '/entrega', entrega);
  }

  static deleteEntrega(id, produtorId){
    return Vue.prototype.$axios.delete('produtor/'+ produtorId + '/entrega/' + id)
  }

  static sendToArmazem(params, entregaId, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entregaId + '/enviar_entrega', params);
  }

  static addNegocio(negocio, entregaId){
    return Vue.prototype.$axios.post('entrega/'+ entregaId + '/negocio', negocio);
  }

  static deleteNegocio(negocioId, entregaId){
    return Vue.prototype.$axios.delete('entrega/'+ entregaId + '/negocio/' + negocioId);
  }

  static updateNegocioQuantidade(params, entregaId){
    return Vue.prototype.$axios.put('entrega/'+ entregaId + '/negocio', params);
  }

  static addTalhao(talhao, entregaId, produtorId){
    return Vue.prototype.$axios.post('produtor/'+ produtorId + '/entrega/'+ entregaId + '/talhao', talhao);
  }

  static deleteTalhao(talhaoId, entregaId, produtorId){
    return Vue.prototype.$axios.delete('produtor/'+ produtorId + '/entrega/'+ entregaId + '/talhao/' + talhaoId);
  }

  static listTalhoes(entregaId, produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega/' + entregaId + '/talhoes');
  }

  static updateTalhoesPercentual(params, entregaId, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entregaId + '/talhoes', params);
  }

  static updateMotorista(motorista, entregaId, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entregaId + '/motorista', motorista);
  }

  static updateArmazem(armazem, entregaId, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entregaId + '/armazem', armazem);
  }

  static addNotaFiscalToNegocio(notaFiscal, entregaId, negocioId){
    return Vue.prototype.$axios.post('entrega/'+ entregaId + '/negocio/' + negocioId + '/nota_fiscal', notaFiscal);
  }

  static updateNotaFiscalItemOfNegocio(params, notaFiscalItemId, entregaId, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entregaId + '/nota_fiscal_item/' + notaFiscalItemId, params);
  }

  static getFilterOptions(){
    return Vue.prototype.$axios.get( 'produtor/'+ this.produtorId + '/entrega/filter_option');
  }
}
