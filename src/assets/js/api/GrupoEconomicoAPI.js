import Vue from 'vue'

export default class GrupoEconomicoAPI{
  static saveGrupoEconomico(grupoEconomico, produtorId){
    return Vue.prototype.$axios.post('/produtor/' + produtorId + '/grupo_economico', grupoEconomico);
  }

  static searchGrupoEconomico(terms, produtorId){
    return Vue.prototype.$axios.get('/produtor/'+produtorId+'/grupo_economico?nome=' + terms);
  }
}
