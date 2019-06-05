import Vue from 'vue'

export default class NotaFiscalProcessoAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_processo', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_processo/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_processo/'+ id);
  }
}
