import Vue from 'vue'

export default class UnidadeAPI{
  static getUnidadesMedida() {
    return Vue.prototype.$axios.get('unidade?type=medida');
  }

  static getUnidadesArea(){
    return Vue.prototype.$axios.get('unidade?type=area');
  }
}
