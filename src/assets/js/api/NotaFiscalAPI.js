import Vue from 'vue'

export default class NotaFiscalAPI{

  static getNotaFiscalItemById(id){
    return Vue.prototype.$axios.get('/nota_fiscal_item/' + id);
  }

  static listSeries(){
    return Vue.prototype.$axios.get('/nota_fiscal_serie');
  }
}
