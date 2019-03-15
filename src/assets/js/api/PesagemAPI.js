import Vue from 'vue'

export default class PesagemAPI{

  static save(pesagem, entregaId){
    return Vue.prototype.$axios.post('entrega/'+ entregaId + '/pesagem', pesagem);
  }

  static delete(id, entregaId){
    return Vue.prototype.$axios.delete('entrega/'+ entregaId + '/pesagem/' + id);
  }
}
