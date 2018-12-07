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
  listCulturas(){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtor_id + '/cultura').then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error)
      })
    });
  },
  // parseProdutos(produtos) {
  //   return produtos.map(produto => {
  //     return {
  //       label: produto.nome,
  //       id: produto.id
  //     }
  //   })
  // },
}
