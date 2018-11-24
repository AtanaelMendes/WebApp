import Vue from 'vue'

export default {
  /*saveGrupoEconomico(grupoEconomico){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('grupo_economico', grupoEconomico).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },*/
  searchProdutos(terms){
    let produtor_id = localStorage.getItem('account.produtor_id');

    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/produto?nome=' + terms).then(response => {
        resolve(this.parseProdutos(response.data))
      }).catch(error => {
        reject(error)
      })
    });
  },
  parseProdutos(produtos) {
    return produtos.map(produto => {
      return {
        label: produto.nome,
        id: produto.id
      }
    })
  },
}
