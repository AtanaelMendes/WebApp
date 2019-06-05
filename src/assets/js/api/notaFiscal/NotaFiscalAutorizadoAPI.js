import Vue from 'vue'

export default class NotaFiscalAutorizadoAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_autorizado', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_autorizado/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_autorizado/'+ id);
  }
}
