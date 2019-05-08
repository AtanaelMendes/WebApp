import Vue from 'vue'

export default class CaminhaoAPI{

  static getCaminhaoById(id,){
    return Vue.prototype.$axios.get('/caminhao/'+ id)
  }

  static getFreeCaminhoes(){
    return Vue.prototype.$axios.get('/caminhao/free')
  }

  static listCaminhoes(filter){
    return Vue.prototype.$axios.get('/caminhao?'+ filter);
  }

  static saveCaminhao(caminhao){
    return Vue.prototype.$axios.post('/caminhao', caminhao);
  }

  static updateCaminao(caminhao, id){
    return Vue.prototype.$axios.put('/caminhao/'+ id, caminhao);
  }

  static archiveCaminhao(id){
    return Vue.prototype.$axios.put('/caminhao/' + id + '/archive');
  }

  static restoreCaminhao(id){
    return Vue.prototype.$axios.put('/caminhao/'+id+'/restore');
  }

  static deleteCaminhao(id){
    return Vue.prototype.$axios.delete('/caminhao/'+ id);
  }
}
