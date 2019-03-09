import Vue from 'vue'

export default class CfopAPI{

  static getCfops(){
    return Vue.prototype.$axios.get('/cfop');
  }

  static getByNumero(numero){
    return Vue.prototype.$axios.get('/cfop/' + numero)
  }
}
