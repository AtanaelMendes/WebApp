import Vue from 'vue'

export default class SafraCulturaTalhaoAPI{

  static listSafraCulturaTalhoes(safraCulturaId){
    return Vue.prototype.$axios.get('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao')
  }

  static listSafraCulturaTalhoesStatus(safraCulturaId){
    return Vue.prototype.$axios.get('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/status')
  }

  static getFullSafraCulturaTalhoes(safraCulturaId){
    return Vue.prototype.$axios.get('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao?type=full')
  }

  static updateSafraCulturaTalhoesStatus(talhoes, safraCulturaId){
    return Vue.prototype.$axios.put('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/status', talhoes);
  }

  static updateSafraCulturaTalhao(safraCulturaTalhao, id, safraCulturaId){
    return Vue.prototype.$axios.put('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/'+ id, safraCulturaTalhao)
  }

  static unattachSafraCulturaTalhao(id, safraCulturaId){
    return Vue.prototype.$axios.delete('/safra_cultura/' + safraCulturaId + '/safra_cultura_talhao/' + id);
  }

  static unattachSafraCulturaTalhoesByArea(safraCulturaId, areaId){
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

  static unattachCultivar(cultivarId, safraCulturaTalhaoId){
    return Vue.prototype.$axios.delete('/safra_cultura_talhao/' + safraCulturaTalhaoId + '/cultivar/' + cultivarId);
  }
}
