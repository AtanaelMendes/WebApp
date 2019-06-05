import Vue from 'vue'

export default class NotaFiscalItemNveAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_item_nve', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_item_nve/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_item_nve/'+ id);
  }
}
