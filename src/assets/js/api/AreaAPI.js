import Vue from 'vue'

export default class AreaAPI{

  static listAreas(produtorId){
    return Vue.prototype.$axios.get( 'produtor/' + produtorId + '/area' );
  }

  static saveArea(area, produtorId){
    return Vue.prototype.$axios.post('/produtor/'+ produtorId + '/area', area);
  }

  static updateArea(area, areaId, produtorId){
    return Vue.prototype.$axios.put('/produtor/' + produtorId + '/area/' + areaId, area);
  }

  static archiveArea(areaId, produtorId){
    return Vue.prototype.$axios.put('/produtor/' + produtorId + '/area/' + areaId + '/archive');
  }

  static restoreArea(areaId, produtorId){
    return Vue.prototype.$axios.put('/produtor/' + produtorId + '/area/' + areaId + '/restore')
  }

  static deleteArea(areaId, produtorId){
    return Vue.prototype.$axios.delete('/produtor/' + produtorId + '/area/' + areaId)
  }

  static getById(id, produtorId){
    return Vue.prototype.$axios.get('/produtor/' + produtorId + '/area/' + id);
  }
}
