import Vue from 'vue'

export default class NotaFiscalAPI{

  static listNotasFiscaisWithFilter(filter){
    return Vue.prototype.$axios.get('/nota_fiscal' + (filter ? "?"+filter : ''));
  }

  static getNotaFiscalById(notaFiscalId){
    return Vue.prototype.$axios.get('/nota_fiscal/'+ notaFiscalId);
  }

  static createNotaFiscal(params){
    return Vue.prototype.$axios.post('/nota_fiscal', params);
  }

  static updateNotaFiscal(params, notaFiscalId, ){
    return Vue.prototype.$axios.put('/nota_fiscal/'+ notaFiscalId, params);
  }

  static deleteNotaFiscal(notaFiscalId){
    return Vue.prototype.$axios.delete('/nota_fiscal/'+ notaFiscalId);
  }

  static listNaturezaOperacao(){
    return Vue.prototype.$axios.get('/nota_fiscal_natureza_operacao');
  }

}
