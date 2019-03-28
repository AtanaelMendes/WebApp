import Vue from 'vue'

export default class CulturaClassificacaoAPI{

  static listByCultura(culturaId){
    return Vue.prototype.$axios.get('cultura/' + culturaId + '/classificacao')
  }
  static getCulturasClassificacao(classificacaoId){
    return Vue.prototype.$axios.get('/classificacao/'+classificacaoId+'/culturas');
  }
  static addCulturaClassificacao(params){
    return Vue.prototype.$axios.post('/cultura_classificacao', params);
  }
  static updateCulturaClassificacao(CulturaClassificacaoId, params){
    return Vue.prototype.$axios.put('/classificacao/cultura_classificacao/'+ CulturaClassificacaoId, params);
  }
  static archiveCulturaClassificacao(CulturaClassificacaoId){
    return Vue.prototype.$axios.put('/classificacao/cultura_classificacao/'+ CulturaClassificacaoId +'/archive');
  }
  static restoreCulturaClassificacao(CulturaClassificacaoId){
    return Vue.prototype.$axios.put('/classificacao/cultura_classificacao/'+ CulturaClassificacaoId +'/restore');
  }
  static deleteCulturaClassificacao(CulturaClassificacaoId){
    return Vue.prototype.$axios.delete('/classificacao/cultura_classificacao/'+ CulturaClassificacaoId );
  }
}
