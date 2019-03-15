import ContatoAPI from "../api/ContatoAPI";

export default class ContatoService{

  constructor() {
  }

  deleteContato(contatoId, pessoaId){
    return new Promise((resolve, reject) => {
      ContatoAPI.deleteContato(contatoId, pessoaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveContato(contatoId, pessoaId){
    return new Promise((resolve, reject) => {
      ContatoAPI.archiveContato(contatoId, pessoaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  restoreContato(contatoId, pessoaId){
    return new Promise((resolve, reject) => {
      ContatoAPI.restoreContato(contatoId, pessoaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  listContatos(pessoaId){
    return new Promise((resolve, reject) => {
      ContatoAPI.listContatos(pessoaId).then( response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  getContato(pessoaId, contatoId){
    return new Promise((resolve, reject) => {
      ContatoAPI.getContato(pessoaId, contatoId).then( response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  saveContato(pessoaId, params){
    return new Promise((resolve, reject) => {
      ContatoAPI.saveContato(params, pessoaId).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  updateContato(pessoaId, contatoId, params){
    return new Promise((resolve, reject) => {
      ContatoAPI.updateContato(params, contatoId, pessoaId).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

}
