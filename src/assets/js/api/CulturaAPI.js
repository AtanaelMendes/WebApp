import Vue from 'vue'

export default class CulturaAPI{

  static listCulturas(){
    return Vue.prototype.$axios.get('/cultura')
  }

  static listCulturasSimpleList(){
    return Vue.prototype.$axios.get('/cultura/simple_list');
  }

  static saveCultura(cultura){
    return Vue.prototype.$axios.post('/cultura', cultura);
  }

  static updateCultura(cultura, id){
    return Vue.prototype.$axios.put('/cultura/' + id, cultura);
  }

  static deleteCultura(id){
    return Vue.prototype.$axios.delete('/cultura/' + id);
  }

  static restoreCultura(id){
    return Vue.prototype.$axios.put('/cultura/' + id + '/restore');
  }

  static archiveCultura(id){
    return Vue.prototype.$axios.put('/cultura/' + id + '/archive');
  }
}
