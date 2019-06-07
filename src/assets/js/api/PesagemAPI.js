import Vue from 'vue'

export default class PesagemAPI{

  static save(pesagem, entregaId){
    return Vue.prototype.$axios.post('entrega/'+ entregaId + '/pesagem', pesagem);
  }

  static update(id, entregaId, pesagem){
    return Vue.prototype.$axios.put('entrega/'+ entregaId + '/pesagem/' + id, pesagem);
  }

  static delete(id, entregaId){
    return Vue.prototype.$axios.delete('entrega/'+ entregaId + '/pesagem/' + id);
  }

  static get(id, entregaId){
    return Vue.prototype.$axios.get('entrega/'+ entregaId + '/pesagem/' + id);
  }
}
