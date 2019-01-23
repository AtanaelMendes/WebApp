import Vue from 'vue'
export default {
  getColheitaPorArea(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/grafico_colheita_area').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  getColheitaPorTalhao(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/grafico_colheita_talhao').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  getColheitaPorCultivar(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/grafico_colheita_cultivar').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  getColheitaDiaria(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/grafico_colheita_diaria').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  getClassificacaoDiaria(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/grafico_classificacao_diaria').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  getEntregaArmazem(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/grafico_entrega_armazem').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  getEntregaCaminhao(safra_id, id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('safra/' + safra_id + '/safra_cultura/' + id + '/grafico_entrega_caminhao').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
