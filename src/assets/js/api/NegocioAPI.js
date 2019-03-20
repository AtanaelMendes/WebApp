import Vue from 'vue'

export default class NegocioAPI{

  static listTiposNegocios(){
    return Vue.prototype.$axios.get('/tipo_negocio');
  }

  static listNegocios(){
    return Vue.prototype.$axios.get('/negocio');
  }

  static getById(id, fullType){
    return Vue.prototype.$axios.get('/negocio/'+ id + (fullType ? '?type=full' : ''));
  }

  static saveNegocio(negocio){
    return Vue.prototype.$axios.post('/negocio', negocio);
  }

  static updateNegocio(negocio, id){
    return Vue.prototype.$axios.put('/negocio/'+ id, negocio);
  }

  static archiveNegocio(id){
    return Vue.prototype.$axios.put('/negocio/' + id + '/archive');
  }

  static restoreNegocio(id){
    return Vue.prototype.$axios.put('/negocio/' + id +'/restore');
  }

  static deleteNegocio(id){
    return Vue.prototype.$axios.delete('/negocio/' + id);
  }
}
