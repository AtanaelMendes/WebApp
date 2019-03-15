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
    console.log('listArmazens')
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
    console.log('listArmazensByEntrega')
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
  },
  addArmazem(params) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.post('produtor/' + produtorId + '/armazem', params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  getArmazemById(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.get('produtor/' + produtorId + '/armazem/'+ id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateArmazem(id, params) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id , params).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  archiveArmazem(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id + '/archive').then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  restoreArmazem(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.put('produtor/' + produtorId + '/armazem/'+ id +'/restore').then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
  deleteArmazem(id) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$axios.delete('produtor/' + produtorId + '/armazem/'+ id).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      })
    });
  },
}
