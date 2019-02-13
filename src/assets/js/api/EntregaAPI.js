import Vue from 'vue'

export default class AuthAPI{

  static getEntrega(id, produtorId){
    return Vue.prototype.$axios.get( 'produtor/'+ produtorId + '/entrega/'+ id);
  }
}
