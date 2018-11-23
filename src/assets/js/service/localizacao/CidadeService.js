import Vue from 'vue'
export default {
  searchCidade(terms){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/cidade?nome=' + terms).then(response => {
        resolve(this.parseCidade(response.data))
      }).catch(error => {
        reject(error)
      })
    });
  },
  parseCidade(cidades) {
    return (cidades).map(cidade => {
      return {
        label: cidade.nome,
        sublabel: cidade.uf + ', ' + cidade.pais,
        id: cidade.id
      }
    })
  },
}
