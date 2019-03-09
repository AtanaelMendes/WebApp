import Vue from 'vue'

export default class CultivarAPI{

  static listCultivares(filter, culturaId){
    return Vue.prototype.$axios.get('cultura/'+culturaId+'/cultivar' + (filter ? filter : ''));
  }

  static saveCultivar(cultivar, culturaId){
    return Vue.prototype.$axios.post('cultura/' + culturaId + '/cultivar', cultivar);
  }

  static deleteCultivar(id, culturaId){
    return Vue.prototype.$axios.delete('cultura/' + culturaId + '/cultivar/' + id);
  }

  static restoreCultivar(id, culturaId){
    return Vue.prototype.$axios.put('cultura/' + culturaId + '/cultivar/' + id + '/restore');
  }

  static archiveCultivar(id, culturaId){
    return Vue.prototype.$axios.put('cultura/' + culturaId + '/cultivar/' + id + '/archive');
  }

  static updateCultivar(cultivar, id, culturaId){
    return Vue.prototype.$axios.put('cultura/' + culturaId + '/cultivar/' + id, cultivar);
  }
}
