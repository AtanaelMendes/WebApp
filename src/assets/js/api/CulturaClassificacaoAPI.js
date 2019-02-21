import Vue from 'vue'

export default class CulturaClassificacaoAPI{

  static listByCultura(culturaId){
    return Vue.prototype.$axios.get('cultura/' + culturaId + '/classificacao')
  }
}
