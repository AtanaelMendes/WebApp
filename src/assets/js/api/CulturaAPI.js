import Vue from 'vue'

export default class CulturaAPI{

  static listCulturas(produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/cultura')
  }

  static listCulturasSimpleList(produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/cultura/simple_list');
  }

  static saveCultura(cultura, produtorId){
    return Vue.prototype.$axios.post('produtor/' + produtorId + '/cultura', cultura);
  }

  static deleteCultura(id, produtorId){
    return Vue.prototype.$axios.delete('produtor/' + produtorId + '/cultura/' + id);
  }

  static restoreCultura(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/cultura/' + id + '/restore');
  }

  static archiveCultura(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/cultura/' + id + '/archive');
  }
}
