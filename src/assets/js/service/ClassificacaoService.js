import Vue from 'vue'
import ClassificacaoAPI from "../api/ClassificacaoAPI";
import ClassificacaoRepository from "../repository/resource/ClassificacaoRepository";
import ClassificacaoListItem from "../model/ClassificacaoListItem";

export default class CaminhaoService {
  #produtorId;
  #classificacaoRepository;

  constructor(produtorId) {
    this.produtorId = produtorId;
    this.classificacaoRepository = new ClassificacaoRepository();
  }

  listClassificacoes() {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.listClassificacoes(this.produtorId).then(response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  getClassificacaoById(id) {
    return new Promise((resolve, reject) => {
      CaminhaoAPI.getClassificacaoById(id, this.produtorId).then(response => {
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

  addClassificacao(classificacao) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.addClassificacao(classificacao, this.produtorId).then(response => {
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

  updateClassificacao(id, classificacao) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.updateClassificacao(classificacao, id, this.produtorId).then(response => {
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

  archiveClassificacao(id) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.archiveClassificacao(id, this.produtorId).then(response => {
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

  restoreClassificacao(id) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.restoreClassificacao(id, this.produtorId).then(response => {
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

  deleteClassificacao(id) {
    return new Promise((resolve, reject) => {
      ClassificacaoAPI.deleteClassificacao(id, this.produtorId).then(response => {
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
