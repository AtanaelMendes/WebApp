import Vue from 'vue'

export default class NotaFiscalObservacaoAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_observacao', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_observacao/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_observacao/'+ id);
  }
}