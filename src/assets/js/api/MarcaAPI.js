import Vue from 'vue'

export default class MarcaAPI{

  static listMarcas(filter, produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/marca' + (filter ? '?filter='+filter : ''));
  }

  static saveMarca(marca, produtorId){
    return Vue.prototype.$axios.post('produtor/' + produtorId + '/marca', marca)
  }

  static deleteMarca(id, produtorId){
    return Vue.prototype.$axios.delete('produtor/' + produtorId + '/marca/' + id)
  }

  static restoreMarca(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/marca/' + id + '/restore');
  }

  static archiveMarca(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/marca/' + id + '/archive');
  }

  static updateMarca(marca, id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/marca/' + id, marca);
  }
}
