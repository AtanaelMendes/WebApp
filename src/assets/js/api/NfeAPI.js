import Vue from 'vue'

export default class NfeAPI{

  static criar(notaFiscalId){
    return Vue.prototype.$axios.post('/nota_fiscal/'+ notaFiscalId + '/nfe/criar');
  }

  static assinar(notaFiscalId){
    return Vue.prototype.$axios.post('/nota_fiscal/'+ notaFiscalId + '/nfe/assinar');
  }

  static enviarSincrono(notaFiscalId){
    return Vue.prototype.$axios.post('/nota_fiscal/'+ notaFiscalId + '/nfe/enviar_sincrono');
  }

  static consultar(notaFiscalId){
    return Vue.prototype.$axios.post('/nota_fiscal/'+ notaFiscalId + '/nfe/consultar');
  }

  static mail(notaFiscalId, params){
    return Vue.prototype.$axios.post('/nota_fiscal/'+ notaFiscalId + '/nfe/mail', params);
  }

  static xml(notaFiscalId){
    return Vue.prototype.$axios.get('/nota_fiscal/'+ notaFiscalId + '/nfe/xml');
  }

  static danfe(notaFiscalId){
    return Vue.prototype.$axios.get('/nota_fiscal/'+ notaFiscalId + '/nfe/danfe', {
      responseType: 'blob'
    });
  }


}
