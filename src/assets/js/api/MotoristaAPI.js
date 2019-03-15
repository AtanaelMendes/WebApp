import Vue from 'vue'

export default class MotoristaAPI{

  static listMotoristas(produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/motorista');
  }

  static saveMotorista(motorista, produtorId){
    return Vue.prototype.$axios.post('produtor/' + produtorId + '/motorista', motorista)
  }
}
