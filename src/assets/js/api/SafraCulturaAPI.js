import Vue from 'vue'

export default class SafraCulturaAPI{

  static getSafraCulturaById(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id);
  }

  static getSafraCulturas(produtorId){
    return Vue.prototype.$axios.get('produtor/'+ produtorId +'/safra/safra_cultura')
  }

  static getFullSafraCulturaTalhoes(safraCulturaId){
    return Vue.prototype.$axios.get('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao?type=full')
  }

  static saveSafraCultura(safraCultura, safraId){
    return Vue.prototype.$axios.post('safra/' + safraId + '/safra_cultura', safraCultura);
  }

  static updateSafraCultura(safraCultura, id, safraId){
    return Vue.prototype.$axios.put('safra/' + safraId + '/safra_cultura/' + id, safraCultura);
  }

  static archiveSafraCultura(id, safraId){
    return Vue.prototype.$axios.put('/safra/' + safraId + '/safra_cultura/' + id + '/archive');
  }

  static restoreSafraCultura(id, safraId){
    return Vue.prototype.$axios.put('/safra/' + safraId + '/safra_cultura/' + id + '/restore');
  }

  static deleteSafraCultura(id, safraId){
    return Vue.prototype.$axios.delete('/safra/' + safraId + '/safra_cultura/' + id);
  }

  static getDiario(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/diario');
  }

  static getDiarioClassificacao(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/diario-classificacao')
  }

  static getAreas(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/areas');
  }

  static getTalhoes(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/talhoes');
  }

  static getMarcas(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/marcas');
  }

  static getCultivares(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/cultivares')
  }

  static getCaminhoes(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/caminhoes');
  }

  static getArmazens(id, safraId){
    return Vue.prototype.$axios.get('safra/' + safraId + '/safra_cultura/' + id + '/armazens');
  }
}
