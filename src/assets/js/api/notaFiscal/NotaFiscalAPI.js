import Vue from 'vue'

export default class NotaFiscalAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal/'+ id);
  }
  static listNotasFiscaisWithFilter(filter){
    return Vue.prototype.$axios.get('/nota_fiscal' + (filter ? "?"+filter : ''));
  }
  static duplicar(notaFiscalId){
    return Vue.prototype.$axios.post('/nota_fiscal/'+ notaFiscalId + '/duplicar');
  }
}
