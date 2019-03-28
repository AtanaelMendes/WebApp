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

  static addCultivar(cultivarId, safraCulturaTalhao, safraCulturaId){
    return Vue.prototype.$axios.post('/safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/' + safraCulturaTalhao + '/add_cultivar/' + cultivarId)
  }
}
