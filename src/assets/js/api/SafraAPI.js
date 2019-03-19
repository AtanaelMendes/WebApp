import Vue from 'vue'

export default class SafraAPI{

  static getSafra(id, produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/safra/' + id);
  }

  static listSafras(produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/safra');
  }

  static listFreeTalhoes(safraId, areaId, unidadeAreaId, unidadeMedidaId, culturaId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/talhao_free/' + areaId
      + '?unidade_area_id=' + unidadeAreaId
      + '&unidade_medida_id=' + unidadeMedidaId
      + '&cultura_id=' + culturaId);
  }

  static saveSafra(safra, produtorId){
    return Vue.prototype.$axios.post('produtor/' + produtorId + '/safra', safra);
  }

  static updateSafra(safra, safraId, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/safra/' + safraId, safra);
  }

  static deleteSafra(id, produtorId){
    return Vue.prototype.$axios.delete('produtor/' + produtorId + '/safra/' + id)
  }

  static restoreSafra(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/safra/' + id + '/restore');
  }

  static archiveSafra(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/safra/' + id + '/archive');
  }

  static favoriteSafra(value, id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/safra/' + id + '/favorite?value=' + value);
  }
}
