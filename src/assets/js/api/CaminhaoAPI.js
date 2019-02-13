import Vue from 'vue'

export default class CaminhaoAPI{

  static getFreeCaminhoes(produtorId){
    return Vue.prototype.$axios.get('/produtor/'+ produtorId +'/caminhao/free')
  }
}
