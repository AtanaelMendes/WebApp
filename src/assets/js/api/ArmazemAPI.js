import Vue from 'vue'

export default class ArmazemAPI{

  static getArmazem(id){
    return Vue.prototype.$axios.get('/armazem/'+ id);
  }

  static listArmazens(filter){
    return Vue.prototype.$axios.get('/armazem' + (filter ? "?"+filter : ''));
  }

  static listArmazensByEntrega(entregaId){
    return Vue.prototype.$axios.get('/armazem/by_entrega/' + entregaId);
  }

  static saveArmazem(armazem){
    return Vue.prototype.$axios.post('/armazem', armazem);
  }

  static updateArmazem(armazem, id){
    return Vue.prototype.$axios.put('/armazem/'+ id , armazem);
  }

  static archiveArmazem(id){
    return Vue.prototype.$axios.put('/armazem/'+ id + '/archive');
  }

  static restoreArmazem(id){
    return Vue.prototype.$axios.put('/armazem/'+ id +'/restore');
  }

  static deleteArmazem(id){
    return Vue.prototype.$axios.delete('/armazem/'+ id);
  }
}
