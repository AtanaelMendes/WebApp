import Vue from 'vue'

export default class NotaFiscalSerieAPI{

  static listSeries(){
    return Vue.prototype.$axios.get('/nota_fiscal_serie');
  }

}
