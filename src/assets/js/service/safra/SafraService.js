import Vue from 'vue'
import { Loading, Dialog } from 'quasar'
import SafraAPI from "../../api/SafraAPI";

export default class SafraService {
  #produtorId;

  constructor(produtorId) {
    this.produtorId = produtorId;
  }

  favoriteSafra(id, value){
    return new Promise((resolve, reject) => {
      SafraAPI.favoriteSafra(value, id, this.produtorId).then(response => {
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

  getSafra(id){
    return new Promise((resolve, reject) => {
      SafraAPI.getSafra(id, this.produtorId).then( response => {
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

  listSafras(){
    return new Promise((resolve, reject) => {
      SafraAPI.listSafras(this.produtorId).then( response => {
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

  saveSafra(safra){
    return new Promise((resolve, reject) => {
      SafraAPI.saveSafra(safra, this.produtorId).then(response => {
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

  deleteSafra(id){
    return new Promise((resolve, reject) => {
      SafraAPI.deleteSafra(id, this.produtorId).then(response => {
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

  restoreSafra(id){
    return new Promise((resolve, reject) => {
      SafraAPI.restoreSafra(id, this.produtorId).then(response => {
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

  archiveSafra(id){
    return new Promise((resolve, reject) => {
      SafraAPI.archiveSafra(id, this.produtorId).then(response => {
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

  updateSafra(id, params){
    return new Promise((resolve, reject) => {
      SafraAPI.updateSafra(params, id, this.produtorId).then(response => {
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

  listFreeTalhoes(area_id, safra_id, unidade_area_id, unidade_medida_id, cultura_id){
    return new Promise((resolve, reject) => {
      SafraAPI.listFreeTalhoes(safra_id, area_id, unidade_area_id, unidade_medida_id, cultura_id).then( response => {
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
}
