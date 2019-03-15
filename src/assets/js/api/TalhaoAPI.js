import Vue from 'vue'

export default class TalhaoAPI{

  static listTalhoesByArea(areaId){
    return Vue.prototype.$axios.get('area/' + areaId + '/talhao');
  }

  static saveTalhao(talhao, areaId){
    return Vue.prototype.$axios.post('/area/'+ areaId + '/talhao', talhao);
  }

  static updateTalhao(talhao, talhaoId, areaId){
    return Vue.prototype.$axios.put('/area/' + areaId + '/talhao/' + talhaoId, talhao);
  }

  static deleteTalhao(id, areaId){
    return Vue.prototype.$axios.delete('/area/' + areaId + '/talhao/' + id);
  }

  static archiveTalhao(id, areaId){
    return Vue.prototype.$axios.put('/area/' + areaId + '/talhao/' + id + '/archive');
  }

  static restoreTalhao(id, areaId){
    return Vue.prototype.$axios.put('/area/' + areaId + '/talhao/' + id + '/restore');
  }

  static getById(id, areaId){
    return Vue.prototype.$axios.get('area/' + areaId +'/talhao/' + id);
  }
}
