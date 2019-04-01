import { Loading, Dialog } from 'quasar'
import SafraAPI from "../../api/SafraAPI";

export default class SafraService {

  constructor() {
  }

  favoriteSafra(id, value){
    return new Promise((resolve, reject) => {
      SafraAPI.favoriteSafra(value, id).then(response => {
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
      SafraAPI.getSafra(id).then( response => {
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
      SafraAPI.listSafras().then( response => {
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
      SafraAPI.saveSafra(safra).then(response => {
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
      SafraAPI.deleteSafra(id).then(response => {
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
      SafraAPI.restoreSafra(id).then(response => {
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
      SafraAPI.archiveSafra(id).then(response => {
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
      SafraAPI.updateSafra(params, id).then(response => {
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
