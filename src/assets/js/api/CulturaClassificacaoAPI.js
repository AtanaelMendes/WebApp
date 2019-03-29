import Vue from 'vue'

export default class CulturaClassificacaoAPI{

  static listByCultura(culturaId){
    return Vue.prototype.$axios.get('cultura/' + culturaId + '/classificacao')
  }
  static getCulturasClassificacao(classificacaoId){
    return Vue.prototype.$axios.get('/classificacao/'+classificacaoId+'/culturas');
  }
  static getCulturaClassificacaoById(CulturaClassificacaoId){
    return Vue.prototype.$axios.get('/cultura_classificacao/'+CulturaClassificacaoId);
  }
  static addCulturaClassificacao(params){
    return Vue.prototype.$axios.post('/cultura_classificacao', params);
  }
  static updateCulturaClassificacao(CulturaClassificacaoId, params){
    return Vue.prototype.$axios.put('/cultura_classificacao/'+ CulturaClassificacaoId, params);
  }
  static deleteCulturaClassificacao(CulturaClassificacaoId){
    return Vue.prototype.$axios.delete('/cultura_classificacao/'+ CulturaClassificacaoId );
  }
}
