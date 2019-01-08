import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import AgroUtils from 'assets/js/AgroUtils'

export default {
  getPessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('/pessoa/' + id).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    });
  },
  listPessoas(filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa?' + AgroUtils.serialize(filter) ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  listPessoasByProdutorId(filter){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa?' + AgroUtils.serialize(filter) ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  searchPessoaGroupedByGrupoEconomico: function(value){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get( 'pessoa?search='+value ).then( response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  searchPessoa: function(){
    return new Promise((resolve, reject) => {
      this.listPessoasByProdutorId().then(response => {
        let pessoaOptions = response.data.map(pessoa => {
          return {
            value: pessoa.id,
            label: pessoa.nome,
            sublabel: pessoa.cpf ? pessoa.cpf : pessoa.cnpj
          }
        });
        resolve(pessoaOptions)
      }).catch(error => {
        reject(error)
      })
    })
  },
  savePessoa(params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('/pessoa', params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  updatePessoa(id, params){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  deletePessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('/pessoa/' + id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  archivePessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + id + '/archive').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },
  restorePessoa(id){
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('/pessoa/' + id + '/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error.response)
      })
    });
  },

}
