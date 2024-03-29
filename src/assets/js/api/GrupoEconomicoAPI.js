import Vue from 'vue'
export default class GrupoEconomicoAPI{

  static saveGrupoEconomico(params){
    return Vue.prototype.$axios.post('/grupo_economico', params);
  }

  static listGruposEconomicos(terms){
    return Vue.prototype.$axios.get('/grupo_economico?type=non-trashed&name=' + terms);
  }

  static listGruposEconomicosWithFilter(filter){
    return Vue.prototype.$axios.get('/grupo_economico' + (filter ? "?"+filter : ''));
  }

  static listPessoasOfGrupoEconomico(id){
    return Vue.prototype.$axios.get('/grupo_economico/'+id+'/pessoas');
  }

  static getGrupoEconomicoById(id){
    return Vue.prototype.$axios.get('/grupo_economico/'+id);
  }

  static updateGrupoEconomico(id, params){
    return Vue.prototype.$axios.put('/grupo_economico/'+ id , params);
  }

  static archiveGrupoEconomico(id){
    return Vue.prototype.$axios.put('/grupo_economico/'+id+'/archive');
  }

  static restoreGrupoEconomico(id){
    return Vue.prototype.$axios.put('/grupo_economico/'+id+'/restore');
  }

  static deleteGrupoEconomico(id){
    return Vue.prototype.$axios.delete('/grupo_economico/'+id );
  }
}
