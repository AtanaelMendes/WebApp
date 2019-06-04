import Vue from 'vue'

export default class NotaFiscalFormaPagamentoAPI{
  static create(params){
    return Vue.prototype.$axios.post('/nota_fiscal_forma_pagamento', params);
  }
  static update(id, params){
    return Vue.prototype.$axios.put('/nota_fiscal_forma_pagamento/'+ id, params);
  }
  static delete(id){
    return Vue.prototype.$axios.delete('/nota_fiscal_forma_pagamento/'+ id);
  }
}
