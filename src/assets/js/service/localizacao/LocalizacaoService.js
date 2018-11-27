import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
export default {
  deleteLocalizacao(pessoaId, localizacaoId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/pessoa/' + pessoaId + '/localizacao/' + localizacaoId).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listLocalizacao: function(){
    return new Promise((resolve, reject) => {
      this.listLocalizacoesByProdutor(localStorage.getItem('account.produtor_id')).then(response => {
        let localizacaoOptions = response.data.map(local => {
          return {
            value: local.id,
            label: local.endereco +', '+ local.numero,
            sublabel: local.bairro +', '+ local.cidade.nome +'-'+ local.cidade.estado.sigla
          }
        });
        resolve(localizacaoOptions)
      }).catch(error => {
        reject(error)
      })
    })
  },
  listLocalizacoes(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa/' + id + '/localizacao' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listLocalizacoesByProdutor(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'produtor/' + id + '/localizacao' ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  getLocalizacao(pessoaId, localizacaoId){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa/' + pessoaId + '/localizacao/' + localizacaoId ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateLocalizacao(pessoaId, localizacaoId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + pessoaId + '/localizacao/'+ localizacaoId, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
  saveLocalizacao(pessoaId, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/pessoa/' + pessoaId + '/localizacao', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  },
}
