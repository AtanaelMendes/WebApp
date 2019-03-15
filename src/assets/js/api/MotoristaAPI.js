import Vue from 'vue'

export default class MotoristaAPI{

  static getMotorista(id, produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/motorista/'+ id);
  }
  static listMotoristas(produtorId){
    return Vue.prototype.$axios.get('produtor/' + produtorId + '/motorista');
  }

  static saveMotorista(motorista, produtorId){
    return Vue.prototype.$axios.post('produtor/' + produtorId + '/motorista', motorista)
  }

  static updateMotorista(motorista, id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/motorista/'+ id, motorista)
  }

  static archiveMotorista(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/motorista/'+ id +'/archive' );
  }

  static restoreMotorista(id, produtorId){
    return Vue.prototype.$axios.put('produtor/' + produtorId + '/motorista/'+ id +'/restore');
  }

  static deleteMotorista(id, produtorId){
    return Vue.prototype.$axios.delete('produtor/' + produtorId + '/motorista/'+ id);
  }
}
