import Vue from 'vue'

export default class NotaFiscalTransporteVolumeLacreAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_transporte_volume_lacre', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_transporte_volume_lacre/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_transporte_volume_lacre/'+ id);
  }
}
