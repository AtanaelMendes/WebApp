import Vue from 'vue'

export default class SafraCulturaAPI{

  static getSafraCulturas(produtorId){
    return Vue.prototype.$axios.get('produtor/'+ produtorId +'/safra/safra_cultura')
  }

  static getFullSafraCulturaTalhoes(safraCulturaId){
    return Vue.prototype.$axios.get('safra_cultura/' + safraCulturaId + '/safra_cultura_talhao?type=full')
  }
}
