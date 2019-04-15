import GrupoEconomicoAPI from "../api/GrupoEconomicoAPI";
import AgroUtils from "../AgroUtils";
export default class GrupoEconomicoService{

  constructor() {
  }
  listGruposEconomicos(filter){
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.listGruposEconomicos(filter).then(response => {
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
  getGrupoEconomicoById(id){
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.getGrupoEconomicoById(id).then(response => {
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
  listPessoasOfGrupoEconomico(id){
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.listPessoasOfGrupoEconomico(id).then(response => {
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
  saveGrupoEconomico(params) {
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.saveGrupoEconomico(params).then(response => {
        if(response.status === 201){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        if(error.response.status === 422){
          reject(new Error('Já existe um registro com esse nome'))
        }else{
          reject(error)
        }
      })
    });
  };
  updateGrupoEconomico(id, params) {
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.updateGrupoEconomico(id, params).then(response => {
        if(response.status === 200){
          resolve(response.data)
        }else{
          reject(response)
        }
      }).catch(error => {
        if(error.response.status === 422){
          reject(new Error('Já existe um registro com esse nome'))
        }else{
          reject(error)
        }
      })
    });
  };
  archiveGrupoEconomico(id) {
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.archiveGrupoEconomico(id).then(response => {
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
  restoreGrupoEconomico(id) {
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.restoreGrupoEconomico(id).then(response => {
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
  deleteGrupoEconomico(id) {
    return new Promise((resolve, reject) => {
      GrupoEconomicoAPI.deleteGrupoEconomico(id).then(response => {
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
