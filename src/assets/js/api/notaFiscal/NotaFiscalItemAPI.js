import Vue from 'vue'

export default class NotaFiscalItemAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_item', params);
  }
  static update(itemId, params){
    return Vue.prototype.$axios.put('/nota_fiscal_item/'+ itemId, params);
  }
  static delete(itemId){
    return Vue.prototype.$axios.delete('/nota_fiscal_item/'+ itemId);
  }
}
