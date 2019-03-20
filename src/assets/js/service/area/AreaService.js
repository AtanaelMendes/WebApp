import AreaAPI from "../../api/AreaAPI";

export default class AreaService{

  constructor() {
  }

  listAreas(filter){
    return new Promise((resolve, reject) => {
      AreaAPI.listAreas().then( response => {
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
      AreaAPI.saveArea(params).then(response => {
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
      AreaAPI.getById(areaId).then(response => {
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
      AreaAPI.updateArea(params, areaId).then(response => {
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
      AreaAPI.deleteArea(areaId).then(response => {
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
      AreaAPI.archiveArea(areaId).then(response => {
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
      AreaAPI.restoreArea(areaId).then(response => {
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

