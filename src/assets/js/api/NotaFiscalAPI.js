import Vue from 'vue'

export default class NotaFiscalAPI{

  static listNaturezaOperacao(){
    return Vue.prototype.$axios.get('/nota_fiscal_natureza_operacao');
  }

  static listNotasFiscaisWithFilter(filter){
    return Vue.prototype.$axios.get('/nota_fiscal' + (filter ? "?"+filter : ''));
  }
  static getNotaFiscalById(notaFiscalId){
    return Vue.prototype.$axios.get('/nota_fiscal/'+ notaFiscalId);
  }
  static createNotaFiscal(params){
    return Vue.prototype.$axios.post('/nota_fiscal', params);
  }
  static updateNotaFiscal(params, notaFiscalId){
    return Vue.prototype.$axios.put('/nota_fiscal/'+ notaFiscalId, params);
  }

  static createItem(params){
    return Vue.prototype.$axios.post('/nota_fiscal_item', params);
  }
  static updateItem(itemId, params){
    return Vue.prototype.$axios.put('/nota_fiscal_item/'+ itemId, params);
  }
  static deleteItem(itemId){
    return Vue.prototype.$axios.delete('/nota_fiscal_item/'+ itemId);
  }

}
