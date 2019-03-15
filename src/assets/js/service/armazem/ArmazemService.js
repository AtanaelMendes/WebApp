import Vue from 'vue';
import ArmazemAPI from "../../api/ArmazemAPI";
import ArmazemRepository from "../../repository/resource/ArmazemRepository";

export default class ArmazemService{
  #produtorId;
  #armazemRepository;

  constructor(produtor_id) {
    this.produtorId = produtor_id;
    this.armazemRepository = new ArmazemRepository();
  }

  listArmazens() {
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        ArmazemAPI.listArmazens(this.produtorId).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error)
        })
      }else{
        this.armazemRepository.getAll().then(armazens => {
          resolve(armazens);
        }).catch(error => {
          reject(error)
        })
      }
    });
  }

  listArmazensByEntrega(entregaId) {
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        ArmazemAPI.listArmazensByEntrega(entregaId, this.produtorId).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error);
        })
      }else{
        this.armazemRepository.getAllByEntrega(entregaId).then(armazens => {
          resolve(armazens);
        }).catch(error => {
          reject(error);
        })
      }
    });
  };

  addArmazem(armazem) {
    return new Promise((resolve, reject) => {
      ArmazemAPI.saveArmazem(armazem, this.produtorId).then(response => {
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

  getArmazemById(id) {
    return new Promise((resolve, reject) => {
      ArmazemAPI.getArmazem(id, this.produtorId).then(response => {
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

  updateArmazem(id, armazem) {
    return new Promise((resolve, reject) => {
      ArmazemAPI.updateArmazem(armazem, id, this.produtorId).then(response => {
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

  archiveArmazem(id) {
    return new Promise((resolve, reject) => {
      ArmazemAPI.archiveArmazem(id, this.produtorId).then(response => {
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

  restoreArmazem(id) {
    return new Promise((resolve, reject) => {
      ArmazemAPI.restoreArmazem(id, this.produtorId).then(response => {
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

  deleteArmazem(id) {
    return new Promise((resolve, reject) => {
      ArmazemAPI.deleteArmazem(id, this.produtorId).then(response => {
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
