import Vue from 'vue'
const produtorId = localStorage.getItem('account.produtor_id');
export default {
  saveGrupoEconomico(grupoEconomico){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/produtor/'+produtorId+'/grupo_economico', grupoEconomico).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  searchGrupoEconomico(terms){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/produtor/'+produtorId+'/grupo_economico?nome=' + terms).then(response => {
        resolve(this.parseGruposEconomicos(response.data))
      }).catch(error => {
        reject(error)
      })
    });
  },
  parseGruposEconomicos(gruposEconomicos) {
    return gruposEconomicos.map(grupoEconomico => {
      return {
        label: grupoEconomico.nome,
        id: grupoEconomico.id
      }
    })
  },
}
