import Vue from 'vue'

export default class CaminhaoAPI{

  static getCaminhaoById(id, produtorId){
    return Vue.prototype.$axios.get('produtor/'+ produtorId +'/caminhao/'+ id)
  }

  static getFreeCaminhoes(produtorId){
    return Vue.prototype.$axios.get('/produtor/'+ produtorId +'/caminhao/free')
  }

  static listCaminhoes(produtorId){
    return Vue.prototype.$axios.get('/produtor/'+ produtorId +'/caminhao');
  }

  static saveCaminhao(caminhao, produtorId){
    return Vue.prototype.$axios.post('/produtor/'+ produtorId +'/caminhao', caminhao);
  }

  static updateCaminao(caminhao, id, produtorId){
    return Vue.prototype.$axios.put('/produtor/'+ produtorId +'/caminhao/'+ id, caminhao);
  }

  static archiveCaminhao(id, produtorId){
    return Vue.prototype.$axios.put('/produtor/'+ produtorId +'/caminhao/' + id + '/archive');
  }

  static restoreCaminhao(id, produtorId){
    return Vue.prototype.$axios.put('/produtor/'+ produtorId +'/caminhao/'+id+'/restore');
  }

  static deleteCaminhao(id, produorId){
    return Vue.prototype.$axios.delete('/produtor/'+ produtorId +'/caminhao/'+ id);
  }
}
