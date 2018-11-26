import Vue from 'vue'
import unidadeMedidaService from 'assets/js/service/UnidadeMedidaService'

export default {
  listTalhao(areaId, filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'area/' + areaId + '/talhao' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveTalhao(areaId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/area/'+ areaId + '/talhao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  getTalhaoById(areaId, talhaoId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('area/' + areaId +'/talhao/' + talhaoId).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listUnidadesArea: function(){
    return new Promise((resolve, reject) => {
      unidadeMedidaService.listUnidadesArea().then(response => {
        let unidadeAreaOptions = response.data.map(unidade => {
          return {
            value: unidade.id,
            label: unidade.nome +', '+ unidade.sigla,
            sublabel: unidade.descricao
          }
        });
        resolve(unidadeAreaOptions)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateTalhao(areaId, talhaoId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/area/' + areaId + '/talhao/' + talhaoId, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deleteTalhao(talhaoId, areaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/area/' + areaId + '/talhao/' + talhaoId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  restoreTalhao(talhaoId, areaId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/area/' + areaId + '/talhao/' + talhaoId + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
}
