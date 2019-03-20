import Vue from 'vue'

export default class GrupoEconomicoAPI{
  static saveGrupoEconomico(grupoEconomico){
    return Vue.prototype.$axios.post('/grupo_economico', grupoEconomico);
  }

  static searchGrupoEconomico(terms){
    return Vue.prototype.$axios.get('/grupo_economico?nome=' + terms);
  }
}
