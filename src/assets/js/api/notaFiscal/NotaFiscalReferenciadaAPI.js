import Vue from 'vue'

export default class NotaFiscalReferenciadaAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_referenciada', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_referenciada/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_referenciada/'+ id);
  }
}
