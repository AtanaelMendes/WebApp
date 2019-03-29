import Vue from 'vue'

export default class ClassificacaoAPI{

  static getClassificacaoById(classificacaoId){
    return Vue.prototype.$axios.get('/classificacao/'+ classificacaoId)
  }
  static listClassificacoes(){
    return Vue.prototype.$axios.get('/classificacao');
  }
  static addClassificacao(params){
    return Vue.prototype.$axios.post('/classificacao', params);
  }
  static updateClassificacao(params, classificacaoId, ){
    return Vue.prototype.$axios.put('/classificacao/'+ classificacaoId, params);
  }
  static archiveClassificacao(classificacaoId){
    return Vue.prototype.$axios.put('/classificacao/' + classificacaoId + '/archive');
  }
  static restoreClassificacao(classificacaoId){
    return Vue.prototype.$axios.put('/classificacao/'+classificacaoId+'/restore');
  }
  static deleteClassificacao(classificacaoId){
    return Vue.prototype.$axios.delete('/classificacao/'+ classificacaoId);
  }

}
