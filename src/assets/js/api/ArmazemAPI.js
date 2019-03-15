import Vue from 'vue'

export default class ArmazemAPI{

  static getArmazem(id,produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem/'+ id);
  }

  static listArmazens(produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem');
  }

  static listArmazensByEntrega(entregaId, produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem/by_entrega/' + entregaId);
  }

  static saveArmazem(armazem, produtorId){
    return Vue.prototype.$axios.post('produtor/' + produtorId + '/armazem', armazem);
  }

  static updateArmazem(armazem, id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id , armazem);
  }

  static archiveArmazem(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id + '/archive');
  }

  static restoreArmazem(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id +'/restore');
  }

  static deleteArmazem(id, produtorId){
    return Vue.prototype.$axios.delete('produtor/' + produtorId + '/armazem/'+ id);
  }
}
