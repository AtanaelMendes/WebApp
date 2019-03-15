import AreaAPI from "../../api/AreaAPI";

export default class AreaService{
  #produtorId;

  constructor(produtorId) {
    this.produtorId = produtorId;
  }

  listAreas(filter){
    return new Promise((resolve, reject) => {
      AreaAPI.listAreas(this.produtorId).then( response => {
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

  saveArea(params){
    return new Promise((resolve, reject) => {
      AreaAPI.saveArea(params, this.produtorId).then(response => {
        if(response.status === 201) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  getAreaById(areaId){
    return new Promise((resolve, reject) => {
      AreaAPI.getById(areaId, this.produtorId).then(response => {
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

  updateArea(areaId, params){
    return new Promise((resolve, reject) => {
      AreaAPI.updateArea(params, areaId, this.produtorId).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  deleteArea(areaId){
    return new Promise((resolve, reject) => {
      AreaAPI.deleteArea(areaId, this.produtorId).then(response => {
        if(response.status === 200) {
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  archiveArea(areaId){
    return new Promise((resolve, reject) => {
      AreaAPI.archiveArea(areaId, this.produtorId).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response)
      })
    });
  };

  restoreArea(areaId){
    return new Promise((resolve, reject) => {
      AreaAPI.restoreArea(areaId, this.produtorId).then(response => {
        if(response.status === 200) {
          resolve(response.data);
        }else{
          reject(response);
        }
      }).catch(error => {
        reject(error.response);
      })
    });
  };

};

