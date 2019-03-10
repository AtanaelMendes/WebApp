import Vue from 'vue'

export default class ContaBancariaAPI{

  static listContasBancarias(produtorId){
    return Vue.prototype.$axios.get('/produtor/'+ produtorId +'/conta_bancaria')
  }
}
