import ClassificacaoAPI from "../api/ClassificacaoAPI";
import ClassificacaoRepository from "../repository/resource/ClassificacaoRepository";

export default class ClassificacaoService {
  #classificacaoRepository;

  constructor() {
    this.classificacaoRepository = new ClassificacaoRepository();
  }

  listClassificacoesWithFilter(filter) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.listClassificacoesWithFilter(filter).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  listClassificacoes(filter) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.listClassificacoes(filter).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  getClassificacaoById(classificacaoId) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.getClassificacaoById(classificacaoId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  addClassificacao(params) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.addClassificacao(params).then(response => {
        if(response.status === 201){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  updateClassificacao(classificacaoId, params) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.updateClassificacao(params, classificacaoId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  archiveClassificacao(classificacaoId) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.archiveClassificacao(classificacaoId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  restoreClassificacao(classificacaoId) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.restoreClassificacao(classificacaoId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };
  deleteClassificacao(classificacaoId) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.deleteClassificacao(classificacaoId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

}
