import Vue from 'vue'

export default class NegocioCulturaMovimentoAPI {

  static getTipos() {
    return Vue.prototype.$axios.get('movimento/tipo');
  }

}
