import AgroUtils from 'assets/js/AgroUtils'
import PessoaAPI from "../api/PessoaAPI";

export default class PessoaService{

  constructor() {
  }

  getPessoa(id){
    return new Promise((resolve, reject) => {
      PessoaAPI.getPessoa(id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listPessoas(filter){
    return new Promise((resolve, reject) => {
      PessoaAPI.listPessoas(AgroUtils.serialize(filter)).then( response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listPessoas(filter){
    return new Promise((resolve, reject) => {
      PessoaAPI.listPessoas(AgroUtils.serialize(filter)).then( response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  searchPessoaGroupedByGrupoEconomico(value){
    return new Promise((resolve, reject) => {
      PessoaAPI.searchPessoa(value).then( response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  searchPessoa(){
    return new Promise((resolve, reject) => {
      this.listPessoas().then(pessoas => {
        let pessoaOptions = pessoas.map(pessoa => {
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
  };

  savePessoa(params){
    return new Promise((resolve, reject) => {
      PessoaAPI.savePessoa(params).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  updatePessoa(id, params){
    return new Promise((resolve, reject) => {
      PessoaAPI.updatePessoa(params, id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  deletePessoa(id){
    return new Promise((resolve, reject) => {
      PessoaAPI.deletePessoa(id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  archivePessoa(id){
    return new Promise((resolve, reject) => {
      PessoaAPI.archivePessoa(id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  restorePessoa(id){
    return new Promise((resolve, reject) => {
      PessoaAPI.restorePessoa(id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

}
