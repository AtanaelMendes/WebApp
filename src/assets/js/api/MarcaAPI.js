import Vue from 'vue'

export default class MarcaAPI{

  static listMarcas(filter){
    return Vue.prototype.$axios.get('/marca' + (filter ? '?filter='+filter : ''));
  }

  static saveMarca(marca){
    return Vue.prototype.$axios.post('/marca', marca)
  }

  static deleteMarca(id){
    return Vue.prototype.$axios.delete('/marca/' + id)
  }

  static restoreMarca(id){
    return Vue.prototype.$axios.put('/marca/' + id + '/restore');
  }

  static archiveMarca(id){
    return Vue.prototype.$axios.put('/marca/' + id + '/archive');
  }

  static updateMarca(marca, id){
    return Vue.prototype.$axios.put('/marca/' + id, marca);
  }
}
