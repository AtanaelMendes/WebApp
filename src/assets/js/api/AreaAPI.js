import Vue from 'vue'

export default class AreaAPI{

  static listAreas(){
    return Vue.prototype.$axios.get('/area' );
  }

  static saveArea(area){
    return Vue.prototype.$axios.post('/area', area);
  }

  static updateArea(area, areaId){
    return Vue.prototype.$axios.put('/area/' + areaId, area);
  }

  static archiveArea(areaId){
    return Vue.prototype.$axios.put('/area/' + areaId + '/archive');
  }

  static restoreArea(areaId){
    return Vue.prototype.$axios.put('/area/' + areaId + '/restore')
  }

  static deleteArea(areaId){
    return Vue.prototype.$axios.delete('/area/' + areaId)
  }

  static getById(id){
    return Vue.prototype.$axios.get('/area/' + id);
  }
}
