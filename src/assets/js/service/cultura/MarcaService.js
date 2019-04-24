import MarcaAPI from "../../api/MarcaAPI";

export default class MarcaService {

  constructor() {
  }

  listMarcas(filter = null){
    return new Promise((resolve, reject) => {
      MarcaAPI.listMarcas(filter).then( response => {
        if(response.status === 200){
          resolve(response.data);
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  }

  saveMarca(params){
    return new Promise((resolve, reject) => {
      MarcaAPI.saveMarca(params).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  deleteMarca(id){
    return new Promise((resolve, reject) => {
      MarcaAPI.deleteMarca(id).then(response => {
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

  restoreMarca(id){
    return new Promise((resolve, reject) => {
      MarcaAPI.restoreMarca(id).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    });
  };

  archiveMarca(id){
    return new Promise((resolve, reject) => {
      MarcaAPI.archiveMarca(id).then(response => {
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

  updateMarca(id, params){
    return new Promise((resolve, reject) => {
      MarcaAPI.updateMarca(params, id).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };
}
