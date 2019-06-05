import Vue from 'vue'

export default class NotaFiscalTransporteVolumeAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_transporte_volume', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_transporte_volume/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_transporte_volume/'+ id);
  }
}
