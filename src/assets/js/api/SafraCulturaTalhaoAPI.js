import Vue from 'vue'

export default class SafraCulturaTalhaoAPI{

  static updateSafraCulturaTalhao(safraCulturaTalhao, id, safraCulturaId){
    return Vue.prototype.$axios.put('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/'+ id, safraCulturaTalhao)
  }

  static deleteSafraCulturaTalhao(id, safraCulturaId){
    return Vue.prototype.$axios.delete('/safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/' + id);
  }

  static deleteSafraCulturaTalhoesByArea(safraCulturaId, areaId){
    return Vue.prototype.$axios.delete('/safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/delete_by_area/' + areaId);
  }

  static listCultivares(safraCulturaId, safraCulturaTalhaoId){
    return Vue.prototype.$axios.get('/safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/' + safraCulturaTalhaoId + '/cultivares');
  }

  static updateCultivares(cultivares, safraCulturaId, safraCulturaTalhaoId){
    return Vue.prototype.$axios.put('/safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/' + safraCulturaTalhaoId + '/cultivares', cultivares);
  }

  static addCultivar(cultivarId, safraCulturaTalhaoId, safraCulturaId){
    return Vue.prototype.$axios.post('/safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/' + safraCulturaTalhaoId + '/add_cultivar/' + cultivarId)
  }

  static deleteCultivar(cultivarId, safraCulturaTalhaoId){
    return Vue.prototype.$axios.delete('/safra_cultura_talhao/' + safraCulturaTalhaoId + '/cultivar/' + cultivarId);
  }
}
