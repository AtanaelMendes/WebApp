import Vue from 'vue'

export default class MoedaAPI{
  static listMoedas(){
    return Vue.prototype.$axios.get('/moeda');
  }
}
