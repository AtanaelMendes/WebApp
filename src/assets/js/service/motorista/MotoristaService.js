import Vue from 'vue';
import MotoristaAPI from "../../api/MotoristaAPI";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";

export default class MotoristaService{
  #motoristaRepository;

  constructor() {
    this.motoristaRepository = new MotoristaRepository();
  }

  listMotoristas(filter) {
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        MotoristaAPI.listMotoristas(filter).then(response => {
          if(response.status === 200){
            resolve(response.data);
          }else{
            reject(response);
          }
        }).catch(error => {
          reject(error)
        })
      }else{
        this.motoristaRepository.getAll().then(motoristas => {
          resolve(motoristas);
        }).catch(error => {
          reject(error);
        })
      }
    });
  }

  getMotoristaById(id) {
    return new Promise((resolve, reject) => {
      MotoristaAPI.getMotorista(id).then(response => {
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

  saveMotorista(motorista){
    return new Promise((resolve, reject) => {
      MotoristaAPI.saveMotorista(motorista).then(response => {
        if(response.status === 201){
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  updateMotorista(id, motorista){
    return new Promise((resolve, reject) => {
      MotoristaAPI.updateMotorista(motorista, id).then(response => {
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

  archiveMotorista(id){
    return new Promise((resolve, reject) => {
      MotoristaAPI.archiveMotorista(id).then(response => {
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

  restoreMotorista(id){
    return new Promise((resolve, reject) => {
      MotoristaAPI.restoreMotorista(id).then(response => {
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

  deleteMotorista(id){
    return new Promise((resolve, reject) => {
      MotoristaAPI.deleteMotorista(id).then(response => {
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
