import Vue from 'vue'

export default class NotaFiscalAPI{

  static listNotasFiscaisWithFilter(filter){
    return Vue.prototype.$axios.get('/nota_fiscal/list' + (filter ? "?"+filter : ''));
  }

  static getNotaFiscalById(notaFiscalId){
    return Vue.prototype.$axios.get('/nota_fiscal/'+ notaFiscalId +'/view');
  }

  static cretateNotaFiscal(params){
    return Vue.prototype.$axios.post('/nota_fiscal', params);
  }

  static updateNotaFiscal(params, notaFiscalId, ){
    return Vue.prototype.$axios.put('/nota_fiscal/'+ notaFiscalId + '/update', params);
  }

  static deleteNotaFiscal(notaFiscalId){
    return Vue.prototype.$axios.delete('/nota_fiscal/'+ notaFiscalId + '/destroy');
  }

}
