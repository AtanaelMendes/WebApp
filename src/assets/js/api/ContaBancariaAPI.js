import Vue from 'vue'

export default class ContaBancariaAPI{

  static listContasBancarias(){
    return Vue.prototype.$axios.get('/conta_bancaria')
  }
}
