import LocalizacaoAPI from "../../api/LocalizacaoAPI";
import UtilsAPI from "../../api/UtilsAPI";

export default class LocalizacaoService{

  constructor() {
  }

  deleteLocalizacao(pessoaId, localizacaoId){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.deleteLocalizacao(localizacaoId, pessoaId).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(resolve)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveLocalizacao(pessoaId, localizacaoId){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.archiveLocalizacao(localizacaoId, pessoaId).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  restoreLocalizacao(pessoaId, localizacaoId){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.restoreLocalizacao(localizacaoId, pessoaId).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error);
      })
    });
  };

  listLocalizacoesByPessoa(pessoaId){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.listLocalizacaos(pessoaId).then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listLocalizacoes(){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.listLocalizacoes().then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  getLocalizacao(pessoaId, localizacaoId){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.getLocalizacao(localizacaoId, pessoaId).then( response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateLocalizacao(pessoaId, localizacaoId, params){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.updateLocalizacao(params, localizacaoId, pessoaId).then(response => {
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

  saveLocalizacao(pessoaId, params){
    return new Promise((resolve, reject) => {
      LocalizacaoAPI.saveLocalizacao(params, pessoaId).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  getAddressByCEP(cep){
    return new Promise((resolve, reject) => {
      if(!cep){
        reject();
        return
      }
      cep = cep.replace('-','');
      UtilsAPI.getAddressByCEP(cep).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }
}
