import Vue from 'vue'

export default class ClassificacaoAPI{

  static getClassificacaoById(id){
    return Vue.prototype.$axios.get('/classificacao/'+ id)
  }
  static listClassificacoes(){
    return Vue.prototype.$axios.get('/classificacao');
  }

  static addClassificacao(params){
    return Vue.prototype.$axios.post('/classificacao', params);
  }

  static updateClassificacao(params, id, ){
    return Vue.prototype.$axios.put('/classificacao/'+ id, params);
  }

  static archiveClassificacao(id){
    return Vue.prototype.$axios.put('/classificacao/' + id + '/archive');
  }

  static restoreClassificacao(id){
    return Vue.prototype.$axios.put('/classificacao/'+id+'/restore');
  }

  static deleteClassificacao(id){
    return Vue.prototype.$axios.delete('/classificacao/'+ id);
  }
}
