import Vue from 'vue';
import MotoristaAPI from "../../api/MotoristaAPI";
import MotoristaRepository from "../../repository/resource/MotoristaRepository";

export default class MotoristaService{
  #produtorId;
  #motoristaRepository;

  constructor(produtor_id) {
    this.produtorId = produtor_id;
    this.motoristaRepository = new MotoristaRepository();
  }

  listMotoristas() {
    return new Promise((resolve, reject) => {
      if(Vue.prototype.serverStatus.isUp) {
        MotoristaAPI.listMotoristas(this.produtorId).then(response => {
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
      Vue.prototype.$axios.get('produtor/' + produtorId + '/motorista/'+ id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  };

  saveMotorista(motorista){
    return new Promise((resolve, reject) => {
      MotoristaAPI.saveMotorista(motorista, this.produtorId).then(response => {
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

  updateMotorista(id, params){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/motorista/'+ id, params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveMotorista(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/motorista/'+ id +'/archive' ).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  restoreMotorista(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtor_id + '/motorista/'+ id +'/restore').then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };

  deleteMotorista(id){
    let produtor_id = localStorage.getItem('account.produtor_id');
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/' + produtor_id + '/motorista/'+ id).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    });
  };
}
