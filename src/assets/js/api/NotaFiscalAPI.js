import Vue from 'vue'

export default class NotaFiscalAPI{

  static getNotaFiscalItemById(id, produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/nota_fiscal_item/' + id);
  }

  static listSeries(produtorId){
    return Vue.prototype.$axios.get('/produtor/' + produtorId + '/nota_fiscal_serie');
  }
}
