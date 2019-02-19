import Vue from 'vue'

export default class AuthAPI{

  static getEntrega(id, produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega/'+ id);
  }

  static saveEntrega(entrega, produtorId){
    return Vue.prototype.$axios.post('produtor/'+ produtorId + '/entrega', entrega)
  }

  static sendToArmazem(params, entregaId, produtorId){
    return Vue.prototype.$axios.put('produtor/'+ produtorId + '/entrega/'+ entregaId + '/enviar_entrega', params)
  }
}
