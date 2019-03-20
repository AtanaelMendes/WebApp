import Vue from 'vue'

export default class SafraAPI{

  static getSafra(id){
    return Vue.prototype.$axios.get('/safra/' + id);
  }

  static listSafras(){
    return Vue.prototype.$axios.get('/safra');
  }

  static listFreeTalhoes(safraId, areaId, unidadeAreaId, unidadeMedidaId, culturaId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/talhao_free/' + areaId
      + '?unidade_area_id=' + unidadeAreaId
      + '&unidade_medida_id=' + unidadeMedidaId
      + '&cultura_id=' + culturaId);
  }

  static saveSafra(safra){
    return Vue.prototype.$axios.post('/safra', safra);
  }

  static updateSafra(safra, safraId){
    return Vue.prototype.$axios.put('/safra/' + safraId, safra);
  }

  static deleteSafra(id){
    return Vue.prototype.$axios.delete('/safra/' + id)
  }

  static restoreSafra(id){
    return Vue.prototype.$axios.put('/safra/' + id + '/restore');
  }

  static archiveSafra(id){
    return Vue.prototype.$axios.put('/safra/' + id + '/archive');
  }

  static favoriteSafra(value, id){
    return Vue.prototype.$axios.put('/safra/' + id + '/favorite?value=' + value);
  }
}
