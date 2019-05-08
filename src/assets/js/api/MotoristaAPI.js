import Vue from 'vue'

export default class MotoristaAPI{

  static getMotorista(id){
    return Vue.prototype.$axios.get('/motorista/'+ id);
  }
  static listMotoristas(filter){
    return Vue.prototype.$axios.get('/motorista?'+filter);
  }

  static saveMotorista(motorista){
    return Vue.prototype.$axios.post('/motorista', motorista)
  }

  static updateMotorista(motorista, id){
    return Vue.prototype.$axios.put('/motorista/'+ id, motorista)
  }

  static archiveMotorista(id){
    return Vue.prototype.$axios.put('/motorista/'+ id +'/archive' );
  }

  static restoreMotorista(id){
    return Vue.prototype.$axios.put('/motorista/'+ id +'/restore');
  }

  static deleteMotorista(id){
    return Vue.prototype.$axios.delete('/motorista/'+ id);
  }
}
