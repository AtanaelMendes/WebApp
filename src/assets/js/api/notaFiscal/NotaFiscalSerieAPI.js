import Vue from 'vue'

export default class NotaFiscalSerieAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_serie', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_serie/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_serie/'+ id);
  }
  static options(){
    return Vue.prototype.$axios.get('/nota_fiscal_serie/options');
  }
}
